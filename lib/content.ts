import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");

export type ContentMeta = {
  slug: string;
  title: string;
  description: string;
  updated_at: string;
  order: number;
};

export type ContentItem = ContentMeta & {
  body: string;
};

function readDir(dir: string): ContentMeta[] {
  const fullDir = path.join(contentRoot, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(fullDir, f), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        updated_at: data.updated_at ?? "",
        order: data.order ?? 99,
      };
    })
    .sort((a, b) => a.order - b.order);
}

function readFile(dir: string, slug: string): ContentItem | null {
  const filePath = path.join(contentRoot, dir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    updated_at: data.updated_at ?? "",
    order: data.order ?? 99,
    body: content,
  };
}

// --- 社内方針 ---
export const getPolicyList = (): ContentMeta[] => readDir("policies");
export const getPolicyItem = (slug: string): ContentItem | null =>
  readFile("policies", slug);

// --- リリース情報 ---
export const getReleaseList = (): ContentMeta[] =>
  readDir("releases").sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1));
export const getReleaseItem = (slug: string): ContentItem | null =>
  readFile("releases", slug);

// --- 運用マニュアル ---
export const getAllManuals = (): ContentMeta[] => readDir("manuals");
export const getManualBySlug = (slug: string): ContentItem | null =>
  readFile("manuals", slug);

// --- 横断検索 ---
export type SearchResult = {
  section: "faq" | "policies" | "releases" | "manuals";
  sectionLabel: string;
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  updated_at: string;
};

export function getAllContent(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  // FAQ (app/faq/faq.json)
  try {
    const faqPath = path.join(process.cwd(), "app/faq/faq.json");
    const faqData: any[] = JSON.parse(fs.readFileSync(faqPath, "utf8"));
    for (const item of faqData) {
      const tags: string[] = Array.isArray(item.tags) ? item.tags : [];
      const searchText = [item.question, item.answer, item.category, ...tags]
        .join(" ")
        .toLowerCase();
      if (searchText.includes(q)) {
        const answer: string = item.answer ?? "";
        results.push({
          section: "faq",
          sectionLabel: "FAQ",
          slug: String(item.id),
          href: `/faq?q=${encodeURIComponent(query)}#faq-${item.id}`,
          title: item.question,
          excerpt: answer.length > 80 ? answer.slice(0, 80) + "…" : answer,
          updated_at: "",
        });
      }
    }
  } catch {
    // faq.json が読めない場合はスキップ
  }

  // Markdown セクション共通処理
  // 修正1：policies / releases は一時的に検索対象から除外
  const sections: Array<{
    dir: string;
    section: SearchResult["section"];
    sectionLabel: string;
    hrefBase: string;
  }> = [
    // { dir: "policies", section: "policies", sectionLabel: "社内方針",     hrefBase: "/policies" },
    // { dir: "releases", section: "releases", sectionLabel: "リリース情報", hrefBase: "/releases" },
    { dir: "manuals", section: "manuals", sectionLabel: "運用マニュアル", hrefBase: "/manuals" },
  ];

  for (const { dir, section, sectionLabel, hrefBase } of sections) {
    for (const meta of readDir(dir)) {
      const item = readFile(dir, meta.slug);
      if (!item) continue;
      const searchText = [item.title, item.description, item.body].join(" ").toLowerCase();
      if (!searchText.includes(q)) continue;
      const base = item.description || item.body;
      const excerpt = base.length > 80 ? base.slice(0, 80) + "…" : base;
      results.push({
        section,
        sectionLabel,
        slug: meta.slug,
        href: `${hrefBase}/${meta.slug}`,
        title: item.title,
        excerpt,
        updated_at: item.updated_at,
      });
    }
  }

  return results;
}

// --- ホーム用：全セクション横断の最近の更新 ---
export type RecentItem = ContentMeta & { section: string; sectionLabel: string };

export function getRecentUpdates(limit = 5): RecentItem[] {
  const policies = getPolicyList().map((m) => ({
    ...m,
    section: "policies",
    sectionLabel: "社内方針",
  }));
  const releases = getReleaseList().map((m) => ({
    ...m,
    section: "releases",
    sectionLabel: "リリース情報",
  }));
  return [...policies, ...releases]
    .filter((m) => m.updated_at)
    .sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1))
    .slice(0, limit);
}
