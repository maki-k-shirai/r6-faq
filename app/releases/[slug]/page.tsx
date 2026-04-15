import { notFound } from "next/navigation";
import Link from "next/link";
import { getReleaseItem, getReleaseList } from "@/lib/content";

export async function generateStaticParams() {
  return getReleaseList().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getReleaseItem(slug);
  return { title: item ? `${item.title} | リリース情報` : "Not Found" };
}

export default async function ReleaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getReleaseItem(slug);
  if (!item) notFound();

  // public/release-notes/[slug].html が存在する場合は iframe で表示
  const htmlPath = `/release-notes/${slug}.html`;

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 56px)" }}>
      {/* ヘッダーバー */}
      <div className="flex items-center justify-between border-b bg-white px-4 py-2 shrink-0">
        <Link
          href="/releases"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800"
        >
          ← リリース情報一覧へ
        </Link>
        <a
          href={htmlPath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          別タブで開く / 印刷
        </a>
      </div>

      {/* iframe */}
      <iframe
        src={htmlPath}
        title={item.title}
        className="flex-1 w-full border-0"
      />
    </div>
  );
}
