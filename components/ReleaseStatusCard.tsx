import Link from "next/link";

export default function ReleaseStatusCard() {
  return (
    <li>
      <Link
        href="/releases/status"
        className="flex items-center justify-between px-4 py-3 transition hover:bg-gray-50"
      >
        <span className="text-sm font-medium text-gray-800">リリース状況（機能・帳票）</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-gray-400">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </li>
  );
}
