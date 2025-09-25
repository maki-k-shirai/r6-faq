// components/FaqList.tsx
"use client";

import React, { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import type { FAQ } from "@/app/faq/types";

// 5カテゴリ（表示順）
const BUCKETS = [
  "対応概要",
  "移行計画",
  "科目・マスタ",
  "帳票・出力",
  "費用・契約",
] as const;
type Bucket = (typeof BUCKETS)[number];

// カテゴリ別の軽いトーン
const COLORS: Record<
  Bucket,
  { border: string; chip: string; chipText: string; hover: string }
> = {
  対応概要: {
    border: "border-blue-200",
    chip: "bg-blue-50",
    chipText: "text-blue-700",
    hover: "hover:bg-blue-50",
  },
  移行計画: {
    border: "border-emerald-200",
    chip: "bg-emerald-50",
    chipText: "text-emerald-700",
    hover: "hover:bg-emerald-50",
  },
  "科目・マスタ": {
    border: "border-amber-200",
    chip: "bg-amber-50",
    chipText: "text-amber-700",
    hover: "hover:bg-amber-50",
  },
  "帳票・出力": {
    border: "border-violet-200",
    chip: "bg-violet-50",
    chipText: "text-violet-700",
    hover: "hover:bg-violet-50",
  },
  "費用・契約": {
    border: "border-rose-200",
    chip: "bg-rose-50",
    chipText: "text-rose-700",
    hover: "hover:bg-rose-50",
  },
};

type Props = {
  faqs: FAQ[];
};

export default function FaqList({ faqs }: Props) {
  const list: FAQ[] = Array.isArray(faqs)
    ? faqs
    : (faqs as any)?.default && Array.isArray((faqs as any).default)
    ? ((faqs as any).default as FAQ[])
    : [];

  // --- フィルタ状態 ---
  const [activeCat, setActiveCat] = useState<Bucket | "すべて">("すべて");
  const [q, setQ] = useState("");

  // --- 開閉制御（カードクリックで開閉） ---
  const [openId, setOpenId] = useState<number | null>(null);
  const toggleOpen = (id: number) =>
    setOpenId((prev) => (prev === id ? null : id));

  // --- コピー状態（トースト用） ---
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // --- カテゴリ別件数 ---
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of BUCKETS) map.set(c, 0);
    for (const f of list) {
      if (map.has(f.category))
        map.set(f.category, (map.get(f.category) || 0) + 1);
    }
    return map;
  }, [list]);

  // --- 検索対象文字列 ---
  const toHaystack = (item: FAQ) =>
    [
      item.question,
      item.answer,
      ...(Array.isArray(item.tags) ? item.tags : []),
      item.category,
    ]
      .join(" ")
      .toLowerCase();

  // --- 絞り込み ---
  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase();
    return list.filter((f) => {
      const cOk = activeCat === "すべて" ? true : f.category === activeCat;
      if (!cOk) return false;
      if (!kw) return true;
      return toHaystack(f).includes(kw);
    });
  }, [list, q, activeCat]);

  // --- クリア ---
  const clearAll = () => {
    setQ("");
    setActiveCat("すべて");
    setOpenId(null);
  };

  // --- コピー処理（回答全文をMarkdownのままコピー） ---
  const copyAnswer = async (id: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1200);
    } catch (e) {
      // 失敗時は無視（必要なら alert 等）
      console.error("copy failed", e);
    }
  };

  // --- ランディング表示かどうか（検索もカテゴリ絞り込みも無し） ---
  const isLanding = activeCat === "すべて" && q.trim() === "";

  // --- カテゴリごとに先頭3件（isLanding時のみ使用） ---
  const pickTop3ByBucket = (bucket: Bucket) =>
    list.filter((f) => f.category === bucket).slice(0, 3);

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      {/* 検索ブロック（大きめに） */}
      <div className="mb-6 rounded-2xl border bg-white px-4 py-5 shadow-sm">
        <label htmlFor="faq-search" className="block text-sm font-medium text-slate-700">
          キーワードで検索
        </label>
        <div className="mt-2 flex items-center gap-2">
          <div className="relative w-full">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M11 19a8 8 0 1 1 5.292-14.08A8 8 0 0 1 11 19Zm9 2-4.35-4.35"
                stroke="#64748b"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              id="faq-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="例：暫定版、予算書、費用、移行 など"
              className="w-full rounded-xl border px-10 py-3 text-base outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400"
            />
          </div>
          <button
            onClick={clearAll}
            className="shrink-0 rounded-xl border px-4 py-3 text-sm hover:bg-slate-50"
          >
            クリア
          </button>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          {filtered.length} 件ヒット（全 {list.length} 件）
        </p>
      </div>

      {/* カテゴリタブ */}
      <div className="mb-2 text-sm font-medium text-slate-600">
        カテゴリで検索
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        <Tab
          label="すべて"
          count={list.length}
          active={activeCat === "すべて"}
          onClick={() => setActiveCat("すべて")}
        />
        {BUCKETS.map((b) => (
          <Tab
            key={b}
            label={b}
            count={counts.get(b) || 0}
            active={activeCat === b}
            onClick={() => setActiveCat(b)}
          />
        ))}
      </div>

      {/* 一覧表示 */}
      {isLanding ? (
        // ランディング：カテゴリごとに3件
        <div className="space-y-8">
          {BUCKETS.map((bucket) => {
            const items = pickTop3ByBucket(bucket);
            if (!items.length) return null;
            const color = COLORS[bucket];
            return (
              <section key={bucket}>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    {bucket}{" "}
                    <span className="align-middle text-xs text-slate-500">
                      （{counts.get(bucket) || 0}件）
                    </span>
                  </h3>
                  <button
                    className="text-sm text-slate-600 underline decoration-dashed underline-offset-4 hover:opacity-80"
                    onClick={() => setActiveCat(bucket)}
                  >
                    もっと見る
                  </button>
                </div>

                <ul className="grid gap-4 sm:grid-cols-2">
                  {items.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      color={color}
                      open={openId === item.id}
                      onToggle={() => toggleOpen(item.id)}
                      onCopy={() => copyAnswer(item.id, item.answer)}
                      copied={copiedId === item.id}
                      onTagClick={(t) => setQ((prev) => (prev ? `${prev} ${t}` : t))}
                    />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      ) : (
        // フィルタ後は通常のリスト（全件表示）
        <ul className="grid gap-4">
          {filtered.map((item) => {
            // カラーはカテゴリに準拠（型安全のため as Bucket）
            const color = COLORS[(item.category as Bucket) || "対応概要"];
            return (
              <ItemCard
                key={item.id}
                item={item}
                color={color}
                open={openId === item.id}
                onToggle={() => toggleOpen(item.id)}
                onCopy={() => copyAnswer(item.id, item.answer)}
                copied={copiedId === item.id}
                onTagClick={(t) => setQ((prev) => (prev ? `${prev} ${t}` : t))}
              />
            );
          })}
          {!filtered.length && (
            <li className="rounded-2xl border bg-white p-6 text-center text-slate-500">
              条件に一致するFAQが見つかりませんでした。
            </li>
          )}
        </ul>
      )}

      {/* トースト */}
      <Toast show={copiedId !== null} message="回答をコピーしました" />
    </section>
  );
}

/** 単一カード（共通） */
function ItemCard({
  item,
  color,
  open,
  onToggle,
  onCopy,
  copied,
  onTagClick,
}: {
  item: FAQ;
  color: { border: string; chip: string; chipText: string; hover: string };
  open: boolean;
  onToggle: () => void;
  onCopy: () => void;
  copied: boolean;
  onTagClick: (t: string) => void;
}) {
  return (
    <li
      className={[
        "rounded-2xl border bg-white shadow-sm transition",
        color.border,
        "hover:shadow-md",
        "cursor-pointer", // カード全体クリック可能
      ].join(" ")}
      onClick={onToggle} // カードどこでも開閉
    >
      <details
        open={open}
        className="group rounded-2xl"
        // details/summary のデフォ挙動と競合しないように summary 側で preventDefault
      >
        <summary
          className="cursor-pointer list-none rounded-2xl px-5 py-4"
          onClick={(e) => {
            e.preventDefault(); // details のデフォ開閉を止めて制御に一本化
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div
                className={[
                  "mb-1 inline-flex items-center rounded-full px-2 py-0.5 text-[11px]",
                  color.chip,
                  color.chipText,
                ].join(" ")}
              >
                {item.category}
              </div>
              <h3 className="text-base font-semibold leading-snug">
                {item.question}
              </h3>
            </div>
            <span className="mt-1 shrink-0 rounded-full border px-2 py-0.5 text-xs text-slate-600">
              ID {item.id}
            </span>
          </div>
        </summary>

        {/* 回答 */}
        <div
          className="px-5 pb-4 -mt-1"
          onClick={(e) => e.stopPropagation()} // 内部操作で親の開閉を発火させない
        >
          <div className={["rounded-xl px-4 py-3 text-sm leading-relaxed", "bg-slate-50/60"].join(" ")}>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  a({ node, ...props }) {
                    return (
                      <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 underline hover:opacity-80"
                      />
                    );
                  },
                  ul({ node, ...props }) {
                    return <ul className="list-disc pl-5" {...props} />;
                  },
                  ol({ node, ...props }) {
                    return <ol className="list-decimal pl-5" {...props} />;
                  },
                  code({ children, className, ...props }) {
                    const text = String(children ?? "");
                    const isBlock = text.includes("\n");
                    if (isBlock) {
                      return (
                        <pre className="overflow-x-auto rounded-md bg-slate-900/95 px-3 py-2 text-[12px] text-slate-100">
                          <code {...props}>{text}</code>
                        </pre>
                      );
                    }
                    return (
                      <code
                        className="rounded bg-slate-100 px-1 py-0.5 text-[0.85em]"
                        {...props}
                      >
                        {text}
                      </code>
                    );
                  },
                }}
              >
                {item.answer}
              </ReactMarkdown>
            </div>
          </div>

          {/* アクション行 */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            {/* タグ */}
            {item.tags?.length ? (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <button
                    key={t}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTagClick(t);
                    }}
                    className={[
                      "rounded-full border px-2.5 py-1 text-xs text-slate-700",
                      "hover:bg-slate-100",
                    ].join(" ")}
                    aria-label={`タグ ${t} で検索`}
                  >
                    #{t}
                  </button>
                ))}
              </div>
            ) : (
              <span />
            )}

            {/* コピー & 更新日 */}
            <div className="ml-auto flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCopy();
                }}
                className={[
                  "inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs",
                  "hover:bg-white",
                ].join(" ")}
                aria-label="回答をコピー"
                title="回答をコピー"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 9V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3M6 9H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-1"
                    stroke="#334155"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                {copied ? "コピー済み" : "コピー"}
              </button>
              <div className="text-[11px] text-slate-500">
                更新日: {item.updated_at}
              </div>
            </div>
          </div>
        </div>
      </details>
    </li>
  );
}

/** カテゴリタブ */
function Tab({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition",
        active ? "bg-slate-900 text-white border-slate-900" : "hover:bg-slate-50",
      ].join(" ")}
      aria-pressed={active}
    >
      <span>{label}</span>
      <span
        className={[
          "rounded-full px-1.5 text-xs",
          active ? "bg-white/20" : "bg-slate-100",
        ].join(" ")}
      >
        {count}
      </span>
    </button>
  );
}

/** シンプルなトースト */
function Toast({ show, message }: { show: boolean; message: string }) {
  return (
    <div
      className={[
        "pointer-events-none fixed inset-x-0 bottom-6 flex justify-center px-4 transition",
        show ? "opacity-100" : "opacity-0",
      ].join(" ")}
      aria-live="polite"
    >
      <div className="rounded-full border bg-white px-4 py-2 text-sm text-slate-700 shadow-md">
        {message}
      </div>
    </div>
  );
}
