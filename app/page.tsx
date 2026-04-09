"use client";

import { useState } from "react";
import noticesData from "@/content/notices.json";
import NoticeBanner from "@/components/NoticeBanner";
import SearchSection from "@/components/SearchSection";
import FeatureStatusSection from "@/components/FeatureStatusSection";

const GUIDE_URL = "https://r6-accounting-system-guide.vercel.app/home";

const DELIVERY_TEMPLATE = `いつもお世話になっております。

令和6年公益法人会計基準への対応に伴い、変更点をご確認いただけるガイドをご案内いたします。
下記URLよりブラウザ上でご確認いただけます。

【変更点ガイド】
${GUIDE_URL}

ご不明な点がございましたら、担当までお気軽にお申し付けください。
引き続きよろしくお願いいたします。`;

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(DELIVERY_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const notices = noticesData as Array<{
    id: number; level: "important" | "info"; message: string; updated_at: string; href?: string;
  }>;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-8">

      {/* お知らせ */}
      {notices.length > 0 && <NoticeBanner notices={notices} />}

      <div className="space-y-6">

        {/* FAQで答えを探す */}
        <section>
          <h2 className="mb-3 text-sm font-semibold text-gray-500">FAQで答えを探す</h2>
          <div className="rounded-md bg-white px-4 py-5 shadow-sm ring-1 ring-black/5">
            <SearchSection />
            <a
              href="/faq"
              className="mt-3 inline-block text-xs font-medium text-pink-900 hover:underline"
            >
              FAQ一覧を見る →
            </a>
          </div>
        </section>

        {/* 機能の提供状況（フラグで制御） */}
        <FeatureStatusSection />

        {/* 変更点ガイド */}
        <section>
          <h2 className="mb-3 text-sm font-semibold text-gray-500">変更点ガイド</h2>
          <div className="flex gap-3">
            {/* ガイドを開く */}
            <div className="flex flex-col items-center gap-1">
              <a
                href={GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                ガイドを開く
              </a>
              <span className="text-[10px] text-gray-400">内容を確認する</span>
            </div>

            {/* 送付文をコピー */}
            <div className="group relative flex flex-col items-center gap-1">
              <button
                onClick={handleCopy}
                className={[
                  "inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium transition",
                  copied
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
                ].join(" ")}
              >
                {copied ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                    コピー済み
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M9 12h6M9 16h6M7 4h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
                        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    送付文をコピー
                  </>
                )}
              </button>
              <span className="text-[10px] text-gray-400">顧客に送る</span>

              {/* ホバー時プレビュー */}
              <div className="pointer-events-none absolute top-full left-0 z-10 mt-2 hidden w-80 group-hover:block">
                <div className="rounded-lg bg-white p-3 shadow-lg ring-1 ring-black/10">
                  <p className="mb-1.5 text-[10px] font-medium text-gray-400">送付文テンプレート（標準）</p>
                  <pre className="whitespace-pre-wrap text-[11px] leading-relaxed text-slate-600">
                    {DELIVERY_TEMPLATE}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ── Bゾーン：事前に把握する（修正1：一時非表示） ─── */}
      {/*
      <hr className="border-gray-200" />

      <div className="space-y-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          事前に把握する
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

          <section>
            <h2 className="mb-3 text-sm font-semibold text-gray-500">社内方針・非対応事項</h2>
            <ul className="divide-y rounded-md border bg-white shadow-sm ring-1 ring-black/5">
              {policyList.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/policies/${p.slug}`}
                    className="flex items-center justify-between px-4 py-3 transition hover:bg-gray-50"
                  >
                    <span className="text-sm font-medium text-gray-800">{p.title}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-gray-400">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/policies"
              className="mt-2 block text-right text-xs text-gray-400 hover:underline"
            >
              すべて見る →
            </Link>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-semibold text-gray-500">リリース情報</h2>
            <ul className="divide-y rounded-md border bg-white shadow-sm ring-1 ring-black/5">
              {releaseList.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/releases/${r.slug}`}
                    className="flex items-center justify-between px-4 py-3 transition hover:bg-gray-50"
                  >
                    <span className="text-sm font-medium text-gray-800">{r.title}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-gray-400">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/releases"
              className="mt-2 block text-right text-xs text-gray-400 hover:underline"
            >
              すべて見る →
            </Link>
          </section>

        </div>
      </div>
      */}

    </div>
  );
}
