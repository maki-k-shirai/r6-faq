import Link from "next/link";
import { getReleaseList } from "@/lib/content";

export const metadata = {
  title: "リリース情報 | 令和6年基準対応ポータル",
};

// const MILESTONES = [
//   { label: "第1期", date: "2025/09", desc: "暫定版提供開始", done: true },
//   { label: "第2期", date: "2026/02", desc: "正式版 初期リリース", done: true },
//   { label: "第3期", date: "未定", desc: "マイナンバーOP対応など", done: false },
// ];

export default function ReleasesPage() {
  const items = getReleaseList();

  return (
    <div className="min-h-screen">
      <section className="border-b bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <h1 className="text-2xl font-extrabold tracking-tight">リリース情報</h1>
          <p className="mt-1 text-slate-600">
            各バージョンのリリースノート。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <ul className="divide-y rounded-2xl border bg-white shadow-sm">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/releases/${item.slug}`}
                className="group flex items-center justify-between px-6 py-4 transition hover:bg-slate-50"
              >
                <span className="font-medium text-slate-800 group-hover:text-violet-700">
                  {item.title}
                </span>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs text-slate-400">{item.updated_at}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-400">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
