"use client";

import { useState } from "react";
import ReleaseStatusSection from "@/components/ReleaseStatusSection";

export default function ReleaseStatusCard() {
  const [open, setOpen] = useState(false);

  return (
    <li>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 transition hover:bg-gray-50"
      >
        <span className="text-sm font-medium text-gray-800">リリース状況（機能・帳票）</span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          className={`shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        >
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="border-t px-2 py-3">
          <ReleaseStatusSection />
        </div>
      )}
    </li>
  );
}
