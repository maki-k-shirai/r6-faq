// app/page.tsx (Server Component)
import FaqList from "@/components/FaqList";
import type { FAQ } from "@/app/faq/types";
import faqData from "@/app/faq/faq.json";

export default function Home() {
  // JSONの形に応じて配列を取り出し
  const faqs = (Array.isArray(faqData) ? faqData : (faqData as any)?.default) as FAQ[];

  return (
    <main id="top" className="min-h-screen">
      {/* ヒーロー */}
      <section className="border-b bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <h1 className="text-3xl font-extrabold tracking-tight">
            令和6年基準対応 FAQ
          </h1>
          <p className="mt-2 text-slate-600">
            社内・顧客サービス部向け。カテゴリから選ぶか、キーワードで素早く検索。
          </p>
        </div>
      </section>

      {/* FAQ（ランディング＋検索・カテゴリ表示） */}
      <FaqList faqs={faqs} />
    </main>
  );
}
