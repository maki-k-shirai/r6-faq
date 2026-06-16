import Link from "next/link";
import { getAllManuals, getPolicyList, getReleaseList } from "@/lib/content";
import ReleaseStatusSection from "@/components/ReleaseStatusSection";

export default function PolicyReleaseSection() {
  const policyList = getPolicyList()
    .sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1))
    .slice(0, 3);
  const releaseList = getReleaseList().slice(0, 3);
  const manualList = getAllManuals().slice(0, 3);

  return (
    <>
      <hr className="border-gray-200" />

      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
          事前に把握する
        </p>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-gray-400">リリース状況</h2>
          <ReleaseStatusSection />
        </section>

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
                    <span className="flex-1 text-sm font-medium text-gray-800">{p.title}</span>
                    {p.updated_at && (
                      <span className="mx-3 shrink-0 text-xs text-gray-400">{p.updated_at}</span>
                    )}
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <section>
          <h2 className="mb-3 text-sm font-semibold text-gray-400">運用マニュアル</h2>
          <a
            href="https://docs.google.com/spreadsheets/d/1_bqRujdlfTNg0XNRooeoYIDsPaMh9oLHQoFfGbXm-mY/edit?gid=0#gid=0"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            正式版進捗管理シートを開く
          </a>
          <ul className="divide-y rounded-md border bg-white shadow-sm ring-1 ring-black/5">
            {manualList.map((m) => (
              <li key={m.slug}>
                <Link
                  href={`/manuals/${m.slug}`}
                  className="flex items-center justify-between px-4 py-3 transition hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-800">{m.title}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-gray-400">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/manuals"
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
