"use client";

import { useState } from "react";

const GUIDE_URL = "https://r6-accounting-system-guide.vercel.app/home";

const DELIVERY_TEMPLATE = `いつもお世話になっております。

令和6年公益法人会計基準への対応に伴い、変更点をご確認いただけるガイドをご案内いたします。
下記URLよりブラウザ上でご確認いただけます。

【変更点ガイド】
${GUIDE_URL}

ご不明な点がございましたら、担当までお気軽にお申し付けください。
引き続きよろしくお願いいたします。`;

export default function CopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(DELIVERY_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
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
  );
}
