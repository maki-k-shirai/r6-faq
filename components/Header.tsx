"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "FAQ", href: "/faq" },
  { label: "社内方針", href: "/policies" },
  { label: "リリース情報", href: "/releases" },
  { label: "運用マニュアル", href: "/manuals" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-800 hover:opacity-80">
          <span className="rounded-md bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white">
            R6
          </span>
          <span className="text-sm">令和6年基準対応ポータル</span>
        </Link>

        {/* デスクトップナビ */}
        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "rounded-lg px-3 py-1.5 text-sm transition",
                isActive(item.href)
                  ? "bg-slate-100 font-semibold text-slate-900"
                  : "text-slate-600 hover:bg-slate-100",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* モバイルハンバーガー */}
        <button
          className="rounded-md p-2 text-slate-600 hover:bg-slate-100 sm:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={menuOpen}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* モバイルメニュー */}
      <nav
        className={[
          "overflow-hidden border-t bg-white px-4 transition-all duration-200 ease-in-out sm:hidden",
          menuOpen ? "max-h-64 py-2 opacity-100" : "max-h-0 py-0 opacity-0",
        ].join(" ")}
        aria-hidden={!menuOpen}
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className={[
              "block rounded-lg px-3 py-2 text-sm",
              isActive(item.href)
                ? "bg-slate-100 font-semibold text-slate-900"
                : "text-slate-600 hover:bg-slate-100",
            ].join(" ")}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
