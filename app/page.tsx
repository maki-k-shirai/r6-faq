import noticesData from "@/content/notices.json";
import NoticeBanner from "@/components/NoticeBanner";
import SearchSection from "@/components/SearchSection";
import FeatureStatusSection from "@/components/FeatureStatusSection";
import PolicyReleaseSection from "@/components/PolicyReleaseSection";
import CopyButton from "@/components/CopyButton";

const GUIDE_URL = "https://r6-accounting-system-guide.vercel.app/home";

export default function Home() {
  const notices = noticesData as Array<{
    id: number; level: "important" | "info"; message: string; updated_at: string; href?: string;
  }>;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-8">

      {/* お知らせ */}
      {notices.length > 0 && <NoticeBanner notices={notices} />}

      <div className="space-y-6">

        {/* FAQで答えを探す */}
        <section>
          <h2 className="mb-3 text-sm font-semibold text-gray-500">FAQで答えを探す</h2>
          <div className="rounded-md bg-white px-4 py-5 shadow-sm ring-1 ring-black/5">
            <SearchSection />
            <a
              href="/faq"
              className="mt-3 inline-block text-xs font-medium text-pink-900 hover:underline"
            >
              FAQ一覧を見る →
            </a>
          </div>
        </section>

        {/* 機能の提供状況（フラグで制御） */}
        <FeatureStatusSection />

        {/* 変更点ガイド */}
        <section>
          <h2 className="mb-3 text-sm font-semibold text-gray-500">変更点ガイド</h2>
          <div className="flex gap-3">
            {/* ガイドを開く */}
            <div className="flex flex-col items-center gap-1">
              <a
                href={GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                ガイドを開く
              </a>
              <span className="text-[10px] text-gray-400">内容を確認する</span>
            </div>

            {/* 送付文をコピー */}
            <CopyButton />
          </div>
        </section>

      </div>

      <PolicyReleaseSection />

    </div>
  );
}
