import Link from "next/link";
import { getAllContent, type SearchResult } from "@/lib/content";
import SearchSection from "@/components/SearchSection";

const SECTION_ORDER: SearchResult["section"][] = ["policies", "guide", "faq", "releases"];

const SECTION_STYLES: Record<SearchResult["section"], string> = {
  policies: "bg-amber-50 text-amber-700",
  guide:    "bg-emerald-50 text-emerald-700",
  faq:      "bg-blue-50 text-blue-700",
  releases: "bg-violet-50 text-violet-700",
};

const SUGGESTED_KEYWORDS = ["費用", "マイナンバー", "移行時期", "科目体系", "申込方法"];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const allResults = query ? getAllContent(query) : [];

  // セクション別にグループ化
  const grouped = SECTION_ORDER.reduce<Record<string, SearchResult[]>>(
    (acc, section) => {
      acc[section] = allResults.filter((r) => r.section === section);
      return acc;
    },
    {} as Record<string, SearchResult[]>
  );

  const totalCount = allResults.length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">

      {/* 検索欄（再検索しやすく上部に再表示） */}
      <SearchSection initialQuery={query} />

      {/* 結果ヘッダー */}
      {query && (
        <div className="flex items-baseline gap-2">
          <h1 className="text-base font-semibold text-slate-800">
            「{query}」の検索結果
          </h1>
          <span className="text-sm text-slate-400">{totalCount}件</span>
        </div>
      )}

      {/* ゼロヒット */}
      {query && totalCount === 0 && (
        <div className="rounded-xl border bg-white px-5 py-8 text-center shadow-sm">
          <p className="text-sm text-slate-500">
            「{query}」に一致するコンテンツは見つかりませんでした。
          </p>
          <p className="mt-1 text-xs text-slate-400">別のキーワードをお試しください。</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {SUGGESTED_KEYWORDS.map((kw) => (
              <Link
                key={kw}
                href={`/search?q=${encodeURIComponent(kw)}`}
                className="rounded-full border border-slate-200 bg-white px-3 py-0.5 text-xs text-slate-600 transition hover:border-slate-400 hover:bg-slate-50"
              >
                {kw}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* セクション別結果 */}
      {SECTION_ORDER.map((section) => {
        const items = grouped[section];
        if (!items || items.length === 0) return null;
        const first = items[0];
        return (
          <section key={section}>
            <div className="mb-2 flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${SECTION_STYLES[section]}`}>
                {first.sectionLabel}
              </span>
              <span className="text-xs text-slate-400">{items.length}件</span>
            </div>
            <ul className="divide-y rounded-xl border bg-white shadow-sm">
              {items.map((item) => (
                <li key={`${item.section}-${item.slug}`}>
                  <Link
                    href={item.href}
                    className="block px-5 py-3.5 transition hover:bg-slate-50"
                  >
                    <p className="text-sm font-medium text-slate-800">{item.title}</p>
                    {item.excerpt && (
                      <p className="mt-0.5 truncate text-xs text-slate-500">{item.excerpt}</p>
                    )}
                    {item.updated_at && (
                      <p className="mt-1 text-xs text-slate-400">{item.updated_at}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {/* クエリなし（直接アクセス） */}
      {!query && (
        <p className="text-sm text-slate-400">上の検索欄からキーワードを入力してください。</p>
      )}

    </div>
  );
}
