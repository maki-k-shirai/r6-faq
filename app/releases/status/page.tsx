import ReleaseStatusSection from "@/components/ReleaseStatusSection";

export const metadata = {
  title: "リリース状況（機能・帳票）| 令和6年基準対応ポータル",
};

export default function ReleaseStatusPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <h1 className="text-2xl font-extrabold tracking-tight">リリース状況（機能・帳票）</h1>
          <p className="mt-1 text-slate-600">令和6年基準 正式版の機能・帳票リリース状況。</p>
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-4 py-8">
        <ReleaseStatusSection />
      </div>
    </div>
  );
}
