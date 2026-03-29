"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

const SUGGESTED_KEYWORDS = ["費用", "マイナンバー", "移行時期", "科目体系", "申込方法"];

export default function SearchSection({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = inputRef.current?.value.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  }

  function fillKeyword(kw: string) {
    if (inputRef.current) {
      inputRef.current.value = kw;
      inputRef.current.focus();
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"
          >
            <path
              d="M11 19a8 8 0 1 1 5.292-14.08A8 8 0 0 1 11 19Zm9 2-4.35-4.35"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            />
          </svg>
          <label htmlFor="global-search" className="sr-only">
            キーワードで全コンテンツを横断検索
          </label>
          <input
            id="global-search"
            ref={inputRef}
            type="search"
            defaultValue={initialQuery}
            placeholder="キーワードで検索（例：費用、マイナンバー、移行時期）"
            className="w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm shadow-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-1"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
        >
          検索
        </button>
      </form>

      {/* スコープ明示 */}
      <p className="mt-2 text-xs text-slate-400">
        FAQ・変更点ガイド・社内方針・リリース情報をまとめて横断検索します
      </p>

      {/* よく検索されるキーワード */}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400">よく検索されるキーワード：</span>
        {SUGGESTED_KEYWORDS.map((kw) => (
          <button
            key={kw}
            type="button"
            onClick={() => fillKeyword(kw)}
            className="rounded-full border border-slate-200 bg-white px-3 py-0.5 text-xs text-slate-600 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            {kw}
          </button>
        ))}
      </div>
    </section>
  );
}
