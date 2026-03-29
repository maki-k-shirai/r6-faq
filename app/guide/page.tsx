import Link from "next/link";
import { getGuideList } from "@/lib/content";

export const metadata = {
  title: "変更点ガイド | 令和6年基準対応ポータル",
};

export default function GuidePage() {
  const items = getGuideList();

  return (
    <div className="min-h-screen">
      <section className="border-b bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <h1 className="text-2xl font-extrabold tracking-tight">変更点ガイド</h1>
          <p className="mt-1 text-slate-600">
            平成20年基準から令和6年基準への変更点を構造的に解説します。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {items.length === 0 ? (
          <p className="text-slate-500">記事がありません。</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {items.map((item, i) => (
              <li key={item.slug}>
                <Link
                  href={`/guide/${item.slug}`}
                  className="group block rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md hover:border-emerald-300"
                >
                  <div className="mb-2 text-xs font-medium text-emerald-600">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="font-semibold text-slate-800 group-hover:text-emerald-700">
                    {item.title}
                  </div>
                  {item.description && (
                    <div className="mt-1 text-sm text-slate-500">{item.description}</div>
                  )}
                  <div className="mt-3 text-xs text-slate-400">更新: {item.updated_at}</div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
