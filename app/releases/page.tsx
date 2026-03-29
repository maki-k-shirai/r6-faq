import Link from "next/link";
import { getReleaseList } from "@/lib/content";

export const metadata = {
  title: "リリース情報 | 令和6年基準対応ポータル",
};

const MILESTONES = [
  { label: "第1期", date: "2025/09", desc: "暫定版提供開始", done: true },
  { label: "第2期", date: "2026/02", desc: "正式版 初期リリース", done: true },
  { label: "第3期", date: "未定", desc: "マイナンバーOP対応など", done: false },
];

export default function ReleasesPage() {
  const items = getReleaseList();

  return (
    <div className="min-h-screen">
      <section className="border-b bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <h1 className="text-2xl font-extrabold tracking-tight">リリース情報</h1>
          <p className="mt-1 text-slate-600">
            各バージョンの対応内容と今後のスケジュール。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8 space-y-8">

        {/* タイムライン */}
        <section>
          <h2 className="mb-4 text-base font-semibold text-slate-700">マイルストーン</h2>
          <div className="flex flex-col gap-0 sm:flex-row">
            {MILESTONES.map((m, i) => (
              <div key={m.label} className="flex sm:flex-1">
                <div className="flex flex-col items-center sm:hidden mr-4">
                  <div className={["h-5 w-5 rounded-full border-2 shrink-0 mt-1", m.done ? "border-emerald-500 bg-emerald-500" : "border-slate-300 bg-white"].join(" ")} />
                  {i < MILESTONES.length - 1 && <div className="w-0.5 flex-1 bg-slate-200 my-1" />}
                </div>
                <div className={["rounded-2xl border p-4 mb-2 sm:mb-0 flex-1", m.done ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white"].join(" ")}>
                  <div className="hidden sm:flex items-center gap-2 mb-3">
                    <div className={["h-3 w-3 rounded-full border-2", m.done ? "border-emerald-500 bg-emerald-500" : "border-slate-300 bg-white"].join(" ")} />
                    {i < MILESTONES.length - 1 && <div className="flex-1 h-0.5 bg-slate-200" />}
                  </div>
                  <div className={["text-xs font-semibold", m.done ? "text-emerald-700" : "text-slate-400"].join(" ")}>
                    {m.label}
                  </div>
                  <div className="font-semibold text-slate-800 mt-0.5">{m.desc}</div>
                  <div className="text-xs text-slate-400 mt-1">{m.date}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* リリースカード一覧 */}
        <section>
          <h2 className="mb-4 text-base font-semibold text-slate-700">リリースノート</h2>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/releases/${item.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border bg-white px-6 py-4 shadow-sm transition hover:shadow-md hover:border-violet-300"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800 group-hover:text-violet-700">
                      {item.title}
                    </div>
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
        </section>
      </div>
    </div>
  );
}
