import Link from "next/link";
import { getPolicyList, getReleaseList } from "@/lib/content";

export default function PolicyReleaseSection() {
  const policyList = getPolicyList()
    .sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1))
    .slice(0, 3);
  const releaseList = getReleaseList().slice(0, 3);

  return (
    <>
      <hr className="border-gray-200" />

      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
          事前に把握する
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

          <section>
            <h2 className="mb-3 text-sm font-semibold text-gray-400">社内方針・非対応事項</h2>
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
            <h2 className="mb-3 text-sm font-semibold text-gray-400">リリース情報</h2>
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
    </>
  );
}
