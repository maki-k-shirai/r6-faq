import FaqList from "@/components/FaqList";
import type { FAQ } from "@/app/faq/types";
import faqData from "@/app/faq/faq.json";

export const metadata = {
  title: "FAQ | 令和6年基準対応ポータル",
};

export default async function FaqPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const faqs = (Array.isArray(faqData) ? faqData : (faqData as any)?.default) as FAQ[];

  return (
    <div className="min-h-screen">
      <section className="border-b bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <h1 className="text-2xl font-extrabold tracking-tight">FAQ</h1>
          <p className="mt-1 text-slate-600">
            カテゴリから選ぶか、キーワードで素早く検索。
          </p>
        </div>
      </section>
      <FaqList faqs={faqs} initialQuery={q ?? ""} />
    </div>
  );
}
