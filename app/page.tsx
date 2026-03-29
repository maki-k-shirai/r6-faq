import Link from "next/link";
import { getGuideList, getPolicyList, getReleaseList, getRecentUpdates } from "@/lib/content";
import faqData from "@/app/faq/faq.json";
import noticesData from "@/content/notices.json";
import NoticeBanner from "@/components/NoticeBanner";
import SearchSection from "@/components/SearchSection";

// 提供状況（更新はこの定数を直接編集）
const PROVISION = [
  { phase: "第1期", date: "2025/09", status: "done",    href: "/releases/v1-2025-09", label: "" },
  { phase: "第2期", date: "2026/02", status: "current", href: "/releases/v2-2026-02", label: "" },
  { phase: "第3期", date: "時期未定", status: "pending", href: "/releases/v3-tbd",     label: "マイナンバーOP対応" },
] as const;

// 目的から探す — ユーザーの探索行動に沿った4導線
const PURPOSE_LINKS = [
  {
    label: "対応時期・ロードマップを確認したい",
    sub:   "現在の提供範囲・今後の予定",
    href:  "/releases",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 17l1.5 3h15L21 17M12 3v11M8 7l4-4 4 4"
          stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    colors: {
      card:   "border-violet-200 bg-violet-50 hover:border-violet-400",
      label:  "text-violet-800 group-hover:text-violet-900",
      sub:    "text-violet-600",
      badge:  "bg-violet-100",
    },
  },
  {
    label: "変更点・差分を理解したい",
    sub:   "平成20年→令和6年基準の変更を体系的に把握",
    href:  "/guide",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 6h16M4 10h16M4 14h10" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    colors: {
      card:   "border-emerald-200 bg-emerald-50 hover:border-emerald-400",
      label:  "text-emerald-800 group-hover:text-emerald-900",
      sub:    "text-emerald-600",
      badge:  "bg-emerald-100",
    },
  },
  {
    label: "顧客説明・判断根拠を確認したい",
    sub:   "PJの決定事項・方針・費用体系",
    href:  "/policies",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 12h6M9 16h6M7 4h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
          stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    colors: {
      card:   "border-amber-200 bg-amber-50 hover:border-amber-400",
      label:  "text-amber-800 group-hover:text-amber-900",
      sub:    "text-amber-600",
      badge:  "bg-amber-100",
    },
  },
  {
    label: "よくある質問から探したい",
    sub:   "問い合わせ対応・社内確認",
    href:  "/faq",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M10 9.5A2 2 0 0 1 14 9.5c0 1.5-2 1.5-2 3M12 17v.01"
          stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    colors: {
      card:   "border-blue-200 bg-blue-50 hover:border-blue-400",
      label:  "text-blue-800 group-hover:text-blue-900",
      sub:    "text-blue-600",
      badge:  "bg-blue-100",
    },
  },
];

export default function Home() {
  const faqs = Array.isArray(faqData) ? faqData : [];
  const guideList  = getGuideList();
  const policyList = getPolicyList();
  const releaseList = getReleaseList();
  const recent = getRecentUpdates(5);
  const notices = noticesData as Array<{
    id: number; level: "important" | "info"; message: string; updated_at: string; href?: string;
  }>;

  const guideTopics  = guideList.slice(0, 3).map((g) => g.title);
  const policyTopics = policyList.slice(0, 3).map((p) => p.title);
  const faqCategories = Array.from(new Set(faqs.map((f: any) => f.category as string)));

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-8">

      {/* H1 */}
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-800 sm:text-3xl">
        令和6年基準対応 PJポータル
      </h1>

      {/* ① 提供状況バー */}
      <section className="rounded-xl border bg-white px-5 py-4 shadow-sm">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          現在の提供状況
        </h2>
        <div className="flex flex-wrap items-center gap-2 sm:gap-0">
          {PROVISION.map((p, i) => (
            <div key={p.phase} className="flex items-center gap-2">
              {/* ステップ間の矢印 */}
              {i > 0 && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  className="shrink-0 text-slate-300 hidden sm:block" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              )}
              {p.status === "pending" ? (
                <div className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  </span>
                  <div>
                    <span className="text-sm text-slate-400">{p.phase}</span>
                    {p.label && (
                      <span className="ml-1 text-xs text-slate-400">（{p.label}）</span>
                    )}
                    <span className="ml-1.5 text-xs text-slate-400">{p.date}</span>
                  </div>
                </div>
              ) : (
                <Link href={p.href} className="group flex items-center gap-1.5 hover:opacity-80">
                  {p.status === "current" ? (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                      <span className="h-2 w-2 rounded-full bg-white" />
                    </span>
                  ) : (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12l5 5L20 7" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  )}
                  <div>
                    <span className={`text-sm font-medium ${p.status === "current" ? "text-emerald-700" : "text-slate-500"}`}>
                      {p.phase}
                    </span>
                    {p.status === "current" && (
                      <span className="ml-1.5 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
                        提供中
                      </span>
                    )}
                    <span className="ml-1.5 text-xs text-slate-400">{p.date}</span>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ② 横断検索 */}
      <SearchSection />

      {/* ③ 目的から探す */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-500">目的から探す</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PURPOSE_LINKS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className={`group flex items-start gap-3 rounded-xl border-2 p-4 shadow-sm transition ${p.colors.card}`}
            >
              <span className={`mt-0.5 shrink-0 rounded-lg p-1.5 ${p.colors.badge}`}>
                {p.icon}
              </span>
              <div>
                <p className={`text-sm font-semibold leading-snug ${p.colors.label}`}>{p.label}</p>
                <p className={`mt-0.5 text-xs ${p.colors.sub}`}>{p.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ④ お知らせ（真の一時告知のみ） */}
      {notices.length > 0 && <NoticeBanner notices={notices} />}

      {/* ⑤ コンテンツ一覧（二層目） */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-500">コンテンツ一覧</h2>
        <div className="space-y-3">

          {/* 社内方針：最重要として full-width + border-2 */}
          <Link
            href="/policies"
            className="group flex w-full items-start gap-4 rounded-2xl border-2 border-amber-200 bg-amber-50 p-5 shadow-sm transition hover:border-amber-400 hover:shadow-md"
          >
            <span className="mt-0.5 shrink-0 rounded-lg bg-amber-100 p-1.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 12h6M9 16h6M7 4h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
                  stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-800 group-hover:text-amber-900">社内方針</span>
                <span className="text-xs text-slate-400">{policyList.length}件</span>
              </div>
              <p className="mt-0.5 text-xs text-amber-700">
                PJの決定事項・判断基準。顧客説明・見積・対応可否の根拠として参照。
              </p>
              <ul className="mt-2 space-y-0.5">
                {policyTopics.map((title) => (
                  <li key={title} className="truncate text-xs text-amber-700">
                    <span className="mr-1.5 text-amber-400" aria-hidden="true">›</span>{title}
                  </li>
                ))}
              </ul>
            </div>
          </Link>

          {/* 変更点ガイド・FAQ・リリース情報 — 3等分 */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

            {/* 変更点ガイド */}
            <Link
              href="/guide"
              className="group rounded-2xl border border-l-4 border-slate-200 border-l-emerald-400 bg-white p-4 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span className="rounded-lg bg-emerald-100 p-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 6h16M4 10h16M4 14h10" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">変更点ガイド</span>
                <span className="ml-auto text-xs text-slate-400">{guideList.length}記事</span>
              </div>
              <p className="mb-2 text-xs text-slate-500">令和6年基準への変更点を体系的に解説。営業・CS・開発の共通知識として。</p>
              <ul className="space-y-0.5">
                {guideTopics.map((title) => (
                  <li key={title} className="truncate text-xs text-slate-600">
                    <span className="mr-1 text-emerald-400" aria-hidden="true">›</span>{title}
                  </li>
                ))}
              </ul>
            </Link>

            {/* FAQ */}
            <Link
              href="/faq"
              className="group rounded-2xl border border-l-4 border-slate-200 border-l-blue-400 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span className="rounded-lg bg-blue-100 p-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="#2563eb" strokeWidth="1.5" />
                    <path d="M10 9.5A2 2 0 0 1 14 9.5c0 1.5-2 1.5-2 3M12 17v.01"
                      stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="text-sm font-bold text-slate-800 group-hover:text-blue-700">FAQ</span>
                <span className="ml-auto text-xs text-slate-400">{faqs.length}件</span>
              </div>
              <p className="mb-2 text-xs text-slate-500">問い合わせ対応・社内確認の主力。キーワード検索・カテゴリ絞り込み対応。</p>
              <div className="flex flex-wrap gap-1">
                {faqCategories.slice(0, 4).map((cat) => (
                  <span key={cat} className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700 ring-1 ring-blue-200">
                    {cat}
                  </span>
                ))}
              </div>
            </Link>

            {/* リリース情報 */}
            <Link
              href="/releases"
              className="group rounded-2xl border border-l-4 border-slate-200 border-l-violet-400 bg-white p-4 shadow-sm transition hover:border-violet-300 hover:shadow-md"
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span className="rounded-lg bg-violet-100 p-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 17l1.5 3h15L21 17M12 3v11M8 7l4-4 4 4"
                      stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-sm font-bold text-slate-800 group-hover:text-violet-700">リリース情報</span>
                <span className="ml-auto text-xs text-slate-400">{releaseList.length}件</span>
              </div>
              <p className="mb-2 text-xs text-slate-500">各フェーズの提供内容・制限事項・今後のロードマップ。</p>
              <ul className="space-y-0.5">
                {releaseList.slice(0, 3).map((r) => (
                  <li key={r.slug} className="truncate text-xs text-slate-600">
                    <span className="mr-1 text-violet-400" aria-hidden="true">›</span>{r.title}
                  </li>
                ))}
              </ul>
            </Link>

          </div>
        </div>
      </section>

      {/* ⑥ 最近の更新 */}
      {recent.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold text-slate-500">最近の更新</h2>
          <ul className="divide-y rounded-2xl border bg-white shadow-sm">
            {recent.map((item) => (
              <li key={`${item.section}-${item.slug}`}>
                <Link
                  href={`/${item.section}/${item.slug}`}
                  className="flex items-center gap-3 px-5 py-3 text-sm transition hover:bg-slate-50"
                >
                  <span className={[
                    "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                    item.section === "guide"    ? "bg-emerald-50 text-emerald-700" :
                    item.section === "policies" ? "bg-amber-50 text-amber-700" :
                                                  "bg-violet-50 text-violet-700",
                  ].join(" ")}>
                    {item.sectionLabel}
                  </span>
                  <span className="flex-1 truncate text-slate-800">{item.title}</span>
                  <span className="shrink-0 text-xs text-slate-400">{item.updated_at}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

    </div>
  );
}
