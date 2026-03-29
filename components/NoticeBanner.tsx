"use client";

import Link from "next/link";
import { useState } from "react";

type Notice = {
  id: number;
  level: "important" | "info";
  message: string;
  updated_at: string;
  href?: string;
};

export default function NoticeBanner({ notices }: { notices: Notice[] }) {
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());

  const visible = notices.filter((n) => !dismissed.has(n.id));
  if (!visible.length) return null;

  return (
    <div className="space-y-2">
      {visible.map((n) => (
        <div
          key={n.id}
          className={[
            "flex items-start gap-3 rounded-xl border px-4 py-3 text-sm",
            n.level === "important"
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-sky-200 bg-sky-50 text-sky-800",
          ].join(" ")}
        >
          <span
            className={[
              "mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-bold",
              n.level === "important"
                ? "bg-red-100 text-red-700"
                : "bg-sky-100 text-sky-700",
            ].join(" ")}
          >
            {n.level === "important" ? "重要" : "お知らせ"}
          </span>

          <div className="flex-1">
            <span>{n.message}</span>
            {n.href && (
              <Link
                href={n.href}
                className="ml-2 underline underline-offset-2 hover:opacity-70"
              >
                詳細を見る →
              </Link>
            )}
          </div>

          <span className="shrink-0 text-xs opacity-50">{n.updated_at}</span>

          <button
            onClick={() => setDismissed((prev) => new Set(Array.from(prev).concat(n.id)))}
            className="ml-1 shrink-0 rounded p-0.5 opacity-40 hover:opacity-80"
            aria-label="閉じる"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
