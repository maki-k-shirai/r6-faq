import Link from "next/link";
import { getAllManuals } from "@/lib/content";

export const metadata = {
  title: "運用マニュアル | 令和6年基準対応ポータル",
};

export default function ManualsPage() {
  const items = getAllManuals();

  return (
    <div className="min-h-screen">
      <section className="border-b bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <h1 className="text-2xl font-extrabold tracking-tight">運用マニュアル</h1>
          <p className="mt-1 text-slate-600">
            正式版移行対応の運用手順・操作マニュアルをまとめています。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {items.length === 0 ? (
          <p className="text-slate-500">ドキュメントがありません。</p>
        ) : (
          <ul className="divide-y rounded-2xl border bg-white shadow-sm">
            {items.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/manuals/${item.slug}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-blue-50 transition"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800">{item.title}</div>
                    {item.description && (
                      <div className="mt-0.5 text-sm text-slate-500">{item.description}</div>
                    )}
                  </div>
                  <div className="shrink-0 text-xs text-slate-400">{item.updated_at}</div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-slate-400">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
