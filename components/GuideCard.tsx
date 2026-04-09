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

export default function GuideCard() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(DELIVERY_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-md border border-gray-200 bg-white shadow-sm">
      {/* ヘッダー */}
      <div className="flex items-center gap-2 px-4 pt-3 pb-1">
        <span className="text-sm font-medium text-gray-700">変更点ガイド</span>
      </div>
      <p className="px-4 pb-2 text-xs text-gray-400">
        令和6年基準への変更点をブラウザ上で操作しながら確認できるアプリ。顧客への送付・説明に使用。
      </p>

      {/* 2アクション */}
      <div className="flex gap-2 px-4 pb-3">
        <a
          href={GUIDE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          ガイドを開く
        </a>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 12h6M9 16h6M7 4h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          送付文を選ぶ
        </button>
      </div>

      {/* 送付文テンプレート（展開時） */}
      {open && (
        <div className="border-t border-slate-100 px-4 py-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">送付文テンプレート（標準）</span>
            <button
              onClick={handleCopy}
              className={[
                "flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition",
                copied
                  ? "bg-emerald-100 text-emerald-700"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              {copied ? (
                <>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  コピー済み
                </>
              ) : (
                <>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  コピー
                </>
              )}
            </button>
          </div>
          <pre className="whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-700 ring-1 ring-slate-200">
            {DELIVERY_TEMPLATE}
          </pre>
        </div>
      )}
    </div>
  );
}
