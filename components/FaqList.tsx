"use client";

import React, { useMemo, useState } from "react";
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

// カテゴリアクセント色（淡色）← キーは必ずクォート！
const CAT_COLORS: Record<
  Bucket,
  { border: string; chip: string; chipText: string; hover: string }
> = {
  "対応概要":   { border: "border-sky-200",    chip: "bg-sky-100",    chipText: "text-sky-700",    hover: "hover:bg-sky-50" },
  "移行計画":   { border: "border-emerald-200", chip: "bg-emerald-100", chipText: "text-emerald-700", hover: "hover:bg-emerald-50" },
  "科目・マスタ": { border: "border-violet-200",  chip: "bg-violet-100",  chipText: "text-violet-700",  hover: "hover:bg-violet-50" },
  "帳票・出力": { border: "border-amber-200",   chip: "bg-amber-100",   chipText: "text-amber-800",   hover: "hover:bg-amber-50" },
  "費用・契約": { border: "border-rose-200",    chip: "bg-rose-100",    chipText: "text-rose-700",    hover: "hover:bg-rose-50" },
};

type Props = { faqs: FAQ[] };

export default function FaqList({ faqs }: Props) {
  // 配列ガード
  const list: FAQ[] = Array.isArray(faqs)
    ? faqs
    : (faqs as any)?.default && Array.isArray((faqs as any).default)
    ? ((faqs as any).default as FAQ[])
    : [];

  // --- 状態 ---
  const [activeCat, setActiveCat] = useState<Bucket | "すべて">("すべて");
  const [q, setQ] = useState("");

  // --- 件数 ---
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of BUCKETS) map.set(c, 0);
    for (const f of list) if (map.has(f.category)) map.set(f.category, (map.get(f.category) || 0) + 1);
    return map;
  }, [list]);

  // --- 検索対象文字列 ---
  const toHaystack = (item: FAQ) =>
    [item.question, item.answer, ...(Array.isArray(item.tags) ? item.tags : []), item.category]
      .join(" ")
      .toLowerCase();

  // --- 絞り込み（一次）---
  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase();
    return list.filter((f) => {
      const cOk = activeCat === "すべて" ? true : f.category === activeCat;
      if (!cOk) return false;
      if (!kw) return true;
      return toHaystack(f).includes(kw);
    });
  }, [list, q, activeCat]);

  // --- グループ化（表示用）---
  const grouped = useMemo(() => {
    const base: Record<Bucket, FAQ[]> = {
      "対応概要": [],
      "移行計画": [],
      "科目・マスタ": [],
      "帳票・出力": [],
      "費用・契約": [],
    };
    for (const f of filtered) {
      if ((BUCKETS as readonly string[]).includes(f.category)) {
        base[f.category as Bucket].push(f);
      }
    }
    return base;
  }, [filtered]);

  // --- ランディング判定（初期表示をスッキリ）---
  const isLanding = activeCat === "すべて" && q.trim() === "";

  // --- タグクリック ---
  const onTagClick = (t: string) => setQ((prev) => (prev ? `${prev} ${t}` : t));

  // --- クリア ---
  const clearAll = () => {
    setQ("");
    setActiveCat("すべて");
  };

  // --- 最近追加（id降順で上位5件をサマリ表示）---
  const recent = useMemo(() => {
    return [...list].sort((a, b) => (b.id ?? 0) - (a.id ?? 0)).slice(0, 5);
  }, [list]);

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">

      {/* 大きい検索バー（アイコン付き） */}
      <div className="mb-8 rounded-3xl border bg-white/80 backdrop-blur px-4 py-5 shadow-sm">
        <label htmlFor="faq-search" className="block text-sm font-semibold text-slate-800 mb-2">
          キーワードで検索
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <svg width="20" height="20" viewBox="0 0 24 24" className="opacity-70">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" />
            </svg>
          </span>
          <input
            id="faq-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="例）暫定版 予算書 料金 科目 など"
            className="w-full rounded-2xl border px-11 py-3 pr-28 text-[15px] outline-none ring-0 focus:border-slate-400"
          />
          <div className="absolute inset-y-0 right-2 flex items-center gap-2">
            {q && (
              <button
                onClick={() => setQ("")}
                className="text-xs rounded-lg border px-2 py-1 hover:bg-slate-50"
                aria-label="検索キーワードをクリア"
              >
                クリア
              </button>
            )}
            <span className="hidden text-[11px] text-slate-500 sm:block">
              {filtered.length} / {list.length}
            </span>
          </div>
        </div>
      </div>

      {/* ランディング：カテゴリカード＋最近追加＋カテゴリ別プレビュー（各3件） */}
      {isLanding ? (
        <>
          {/* カテゴリカード */}
          <section className="mb-10">
            <h3 className="mb-3 text-sm font-semibold text-slate-700">カテゴリから選ぶ</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {BUCKETS.map((b) => (
                <CategoryCard
                  key={b}
                  title={b}
                  count={counts.get(b) || 0}
                  color={CAT_COLORS[b]}
                  onClick={() => setActiveCat(b)}
                />
              ))}
            </div>
          </section>

          {/* 最近追加（上位5件） */}
          <section className="mb-10">
            <h3 className="mb-3 text-sm font-semibold text-slate-700">最近追加されたFAQ</h3>
            <ul className="grid gap-3">
              {recent.map((item) => (
                <li key={item.id} className="rounded-2xl border bg-white hover:shadow-sm transition">
                  <button
                    onClick={() => {
                      setActiveCat(item.category as Bucket);
                      setQ(item.question.split(" ")[0] ?? "");
                    }}
                    className="w-full text-left px-4 py-3"
                  >
                    <div className="mb-1 text-[11px] font-medium text-slate-500">{item.category}</div>
                    <div className="text-sm font-semibold line-clamp-2">{item.question}</div>
                    <div className="mt-1 text-[11px] text-slate-500">ID {item.id} ・ 更新日 {item.updated_at}</div>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* カテゴリ別プレビュー（各3件） */}
          {BUCKETS.map((cat) => {
            const items = list.filter((f) => f.category === cat).slice(0, 3);
            if (!items.length) return null;
            return (
              <section key={cat} className="mb-8">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-800">{cat}</h3>
                  <button
                    onClick={() => setActiveCat(cat)}
                    className={`text-sm underline decoration-dotted ${CAT_COLORS[cat].chipText}`}
                  >
                    もっと見る
                  </button>
                </div>
                <ul className="grid gap-3">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className={`rounded-2xl border ${CAT_COLORS[cat].border} bg-white transition hover:shadow-sm`}
                    >
                      <button
                        onClick={() => {
                          setActiveCat(cat);
                          setQ(item.question.split(" ")[0] ?? "");
                        }}
                        className={`w-full text-left px-4 py-3 ${CAT_COLORS[cat].hover}`}
                      >
                        <div className="text-sm font-semibold line-clamp-2">{item.question}</div>
                        <div className="mt-1 text-[11px] text-slate-500">ID {item.id}</div>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </>
      ) : (
        <>
          {/* カテゴリタブ（検索中も選べる） */}
          <div className="mb-6 flex flex-wrap gap-2">
            <Pill
              label="すべて"
              count={list.length}
              active={activeCat === "すべて"}
              onClick={() => setActiveCat("すべて")}
            />
            {BUCKETS.map((b) => (
              <Pill
                key={b}
                label={b}
                count={counts.get(b) || 0}
                active={activeCat === b}
                onClick={() => setActiveCat(b)}
              />
            ))}
            {(q || activeCat !== "すべて") && (
              <button onClick={clearAll} className="ml-auto rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50">
                絞り込みを解除
              </button>
            )}
          </div>

          {/* 結果表示 */}
          {activeCat === "すべて" ? (
            BUCKETS.map((cat) =>
              grouped[cat].length ? (
                <CategorySection
                  key={cat}
                  title={cat}
                  items={grouped[cat]}
                  onTagClick={onTagClick}
                  accent={CAT_COLORS[cat]}
                />
              ) : null
            )
          ) : grouped[activeCat].length ? (
            <CategorySection
              title={activeCat}
              items={grouped[activeCat]}
              onTagClick={onTagClick}
              accent={CAT_COLORS[activeCat]}
            />
          ) : (
            <EmptyState />
          )}
        </>
      )}

      {/* 戻るボタン */}
      <div className="mt-10 flex justify-end">
        <a href="#top" className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50">
          トップへ戻る
        </a>
      </div>
    </section>
  );
}

/* ========= Sub Components ========= */

function CategoryCard({
  title,
  count,
  color,
  onClick,
}: {
  title: Bucket;
  count: number;
  color: { border: string; chip: string; chipText: string; hover: string };
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-start justify-between rounded-2xl border ${color.border} bg-white p-4 shadow-sm transition hover:shadow-md`}
      aria-label={`${title} を開く`}
    >
      <div>
        <div className="text-sm font-bold text-slate-800">{title}</div>
        <div className="mt-1 text-xs text-slate-500">よくある質問 {count} 件</div>
      </div>
      <div className={`ml-3 rounded-xl ${color.chip} px-2 py-1 text-xs ${color.chipText}`}>
        開く →
      </div>
    </button>
  );
}

function CategorySection({
  title,
  items,
  onTagClick,
  accent,
}: {
  title: string;
  items: FAQ[];
  onTagClick: (t: string) => void;
  accent: { border: string; chip: string; chipText: string; hover: string };
}) {
  return (
    <section className="mb-10">
      <h3 className="mb-3 text-lg font-bold text-slate-800">{title}</h3>
      <ul className="grid gap-4">
        {items.map((item) => (
          <li key={item.id} className={`rounded-2xl border ${accent.border} bg-white shadow-sm transition hover:shadow-md`}>
            <details className="group rounded-2xl">
              <summary className={`cursor-pointer list-none rounded-2xl px-5 py-4 ${accent.hover}`}>
                <div className="flex items-start justify-between gap-3">
                  <h4 className="flex-1 text-base font-semibold leading-snug">{item.question}</h4>
                  <span className={`mt-1 shrink-0 rounded-full border px-2 py-0.5 text-xs ${accent.chipText}`}>
                    ID {item.id}
                  </span>
                </div>
              </summary>

              <div className="px-5 pb-4 -mt-1">
                <div className="rounded-xl bg-slate-50/60 px-4 py-3 text-sm leading-relaxed">
                  {item.answer.split("\n").map((line, i) => (
                    <p key={i} className={i ? "mt-2" : ""}>
                      {line}
                    </p>
                  ))}
                </div>

                {item.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <button
                        key={t}
                        onClick={() => onTagClick(t)}
                        className="rounded-full border px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-100"
                      >
                        #{t}
                      </button>
                    ))}
                  </div>
                ) : null}

                <div className="mt-3 text-right text-[11px] text-slate-500">更新日: {item.updated_at}</div>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border bg-white p-6 text-center text-sm text-slate-600">
      条件に一致するFAQがありません。キーワードやカテゴリを変更してください。
    </div>
  );
}

function Pill({
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
      <span className={["rounded-full px-1.5 text-xs", active ? "bg-white/20" : "bg-slate-100"].join(" ")}>
        {count}
      </span>
    </button>
  );
}
