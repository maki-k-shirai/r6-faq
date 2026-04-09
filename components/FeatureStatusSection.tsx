// ① 機能の提供状況スロット
// SHOW_FEATURE_STATUS=true の場合のみ表示する。
// データ整備完了後にコンテンツを実装すること。

export default function FeatureStatusSection() {
  if (process.env.SHOW_FEATURE_STATUS !== "true") return null;

  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold text-gray-500">機能の提供状況</h2>
      <div className="rounded-md border bg-white px-5 py-6 text-center text-sm text-gray-400 shadow-sm ring-1 ring-black/5">
        （データ整備中）
      </div>
    </section>
  );
}
