type BadgeType = "done" | "soon" | "later" | "tbd";
type TagType = "new" | "mod";

interface CategoryItem {
  label: string;
  tag?: TagType;
}

interface Category {
  label: string;
  items: CategoryItem[];
}

interface Phase {
  status: BadgeType;
  title: string;
  date: string;
  categories: Category[];
}

interface TbdItem {
  label: string;
  tag?: TagType;
  alert?: boolean;
}

const BADGE_STYLES: Record<BadgeType, { bg: string; text: string; border: string; label: string }> = {
  done:  { bg: "bg-emerald-500", text: "text-white",       border: "border-emerald-500", label: "提供済み" },
  soon:  { bg: "bg-amber-400",   text: "text-white",       border: "border-amber-400",   label: "次回リリース" },
  later: { bg: "bg-indigo-400",  text: "text-white",       border: "border-indigo-400",  label: "その後のリリース" },
  tbd:   { bg: "bg-stone-400",   text: "text-white",       border: "border-stone-400",   label: "時期未定" },
};

const TAG_STYLES: Record<TagType, { bg: string; text: string; label: string }> = {
  new: { bg: "bg-pink-100",  text: "text-pink-800",  label: "新規" },
  mod: { bg: "bg-blue-100",  text: "text-blue-800",  label: "修正" },
};

const PHASES: Phase[] = [
  {
    status: "done",
    title: "予算・マスタ設定",
    date: "2026年1月〜",
    categories: [
      {
        label: "歳出予算",
        items: [
          { label: "歳出予算入力" },
          { label: "当初歳出予算（案）書" },
          { label: "補正歳出予算（案）書" },
          { label: "歳出予算書綴本表" },
          { label: "歳出予算書細目内訳表" },
        ],
      },
      {
        label: "活動予算",
        items: [
          { label: "活動予算入力", tag: "mod" },
          { label: "当初活動予算（案）書", tag: "new" },
          { label: "補正活動予算（案）書", tag: "new" },
          { label: "事業別活動予算入力", tag: "mod" },
        ],
      },
      {
        label: "マスタ・設定",
        items: [
          { label: "科目保守" },
          { label: "関係者登録" },
          { label: "事業登録" },
          { label: "銀行登録" },
          { label: "担当員・ユーザー設定" },
          { label: "消費税計算設定" },
          { label: "文章設定" },
        ],
      },
    ],
  },
  {
    status: "done",
    title: "伝票入力・日次処理",
    date: "2026年2月〜",
    categories: [
      {
        label: "伝票・伝票",
        items: [
          { label: "個別調定・支出負担行為入力", tag: "mod" },
          { label: "伝票決裁入力" },
          { label: "仮伝票入力" },
          { label: "伝票入力", tag: "mod" },
          { label: "伝票検索", tag: "mod" },
          { label: "債権債務相殺込伝票入力" },
        ],
      },
      {
        label: "日次帳票",
        items: [
          { label: "現金過不足帳（銀行帳）", tag: "new" },
          { label: "付箋帳", tag: "mod" },
          { label: "伝票一覧参照" },
          { label: "現金過不足参照" },
          { label: "伝票一覧表" },
          { label: "未払行明細書" },
          { label: "支払調書" },
          { label: "日記帳（試算表）" },
        ],
      },
      {
        label: "マスタ追加",
        items: [
          { label: "財源登録", tag: "new" },
          { label: "財源一覧表", tag: "new" },
        ],
      },
    ],
  },
  {
    status: "done",
    title: "月次処理（帳表・試算表）",
    date: "2026年4月〜",
    categories: [
      {
        label: "帳表・帳票",
        items: [
          { label: "総合元帳", tag: "mod" },
          { label: "摘要入力帳", tag: "mod" },
          { label: "事業別元帳" },
          { label: "日記帳（現金・歳出）", tag: "mod" },
        ],
      },
      {
        label: "試算表",
        items: [
          { label: "試算表", tag: "mod" },
          { label: "歳出試算表" },
          { label: "活動試算表", tag: "mod" },
          { label: "貸借対照表試算表", tag: "mod" },
          { label: "合計残高試算表", tag: "mod" },
          { label: "事業別歳出試算表" },
        ],
      },
      {
        label: "その他",
        items: [
          { label: "活動予算残高一覧表", tag: "mod" },
          { label: "使途特定資産登録", tag: "new" },
          { label: "総合振込依頼処理" },
          { label: "月次締め" },
        ],
      },
    ],
  },
  {
    status: "soon",
    title: "月次処理（月次計算書・予算差引）／決算帳票・消費税・経営分析",
    date: "2026年7月 予定",
    categories: [
      {
        label: "月次",
        items: [
          { label: "月次計算書（月次）★" },
          { label: "予算残高一覧表" },
          { label: "予算差引簿" },
          { label: "歳出試算表（月次）" },
          { label: "事業別歳出試算表（月次）" },
          { label: "債権債務管理（補助帳・滞納表等）" },
          { label: "財源入別残高登録", tag: "new" },
        ],
      },
      {
        label: "決算帳票",
        items: [
          { label: "貸借対照表", tag: "mod" },
          { label: "会計区分別内訳", tag: "mod" },
          { label: "資産及び負債の状況", tag: "mod" },
          { label: "使途特定資産内訳", tag: "mod" },
          { label: "目的別運用資産一覧表", tag: "new" },
          { label: "活動計算書", tag: "mod" },
          { label: "財源区分別内訳", tag: "mod" },
          { label: "キャッシュフロー計算書（直接法）", tag: "mod" },
          { label: "キャッシュフロー計算書（間接法）", tag: "mod" },
          { label: "決算試算表", tag: "mod" },
          { label: "注記入力・出力", tag: "mod" },
          { label: "月次計算書（決算）★" },
          { label: "月次計算書総括表" },
          { label: "資金月次計算書総括表" },
          { label: "決算チェックリスト" },
          { label: "関連当事者取引チェック" },
          { label: "資産及び負債の前期比入力" },
        ],
      },
      {
        label: "消費税帳票",
        items: [
          { label: "消費税課税仕入明細表" },
          { label: "消費税課税仕入集計表" },
          { label: "消費税申告税計算書" },
          { label: "科目別税課税仕入内訳表" },
          { label: "課税仕入取引チェックリスト" },
        ],
      },
      {
        label: "経営分析",
        items: [
          { label: "月次計算書（予算対比・上半期・四半期）" },
          { label: "移動平均表" },
          { label: "損益計算書" },
          { label: "科目別事業別発生高集計表" },
        ],
      },
    ],
  },
  {
    status: "later",
    title: "決算帳票（追加）・マスタ追加",
    date: "2026年9月 予定",
    categories: [
      {
        label: "決算帳票",
        items: [
          { label: "注記入力・出力（追加対応）", tag: "mod" },
          { label: "資産及び負債の前期比入力", tag: "mod" },
        ],
      },
      {
        label: "マスタ追加",
        items: [
          { label: "使途特定資産一覧表", tag: "new" },
          { label: "固定資産連動データ取込", tag: "new" },
        ],
      },
    ],
  },
];

const TBD_ITEMS: TbdItem[] = [
  { label: "年次締め", alert: true },
  { label: "比較表帳票（BS・歳出・活動・CF）" },
  { label: "月次推移表帳票" },
  { label: "予算シミュレーション" },
  { label: "決算見込（歳出・活動）" },
  { label: "財産見積適格性明細", tag: "new" },
];

function LegendItem({ badge, label, desc }: { badge: string; label: string; desc: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs">
      <span className={badge}>{label}</span>
      <span className="text-stone-500">{desc}</span>
    </span>
  );
}

function ItemChip({ item }: { item: CategoryItem }) {
  return (
    <span className="flex items-center gap-1 rounded px-2 py-0.5 text-xs bg-stone-100 text-stone-800 leading-snug">
      {item.label}
      {item.tag && (
        <span className={`rounded px-1 py-px text-[10px] font-bold ${TAG_STYLES[item.tag].bg} ${TAG_STYLES[item.tag].text}`}>
          {TAG_STYLES[item.tag].label}
        </span>
      )}
    </span>
  );
}

export default function ReleaseStatusSection() {
  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden mb-8">
      {/* ヘッダー */}
      <div className="border-l-4 border-emerald-500 px-5 py-4 bg-gradient-to-r from-emerald-50 to-white">
        <h2 className="text-base font-bold text-slate-800">令和6年基準 正式版 機能・帳票リリース状況</h2>
        <p className="text-xs text-slate-500 mt-0.5">営業・CS チーム 参照用｜2026年6月更新｜情報基準日：2026年6月16日</p>
      </div>

      <div className="px-5 py-4 space-y-1">
        {/* 凡例 */}
        <div className="rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 mb-5">
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">凡例</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <LegendItem badge="rounded-full border-2 border-emerald-500 bg-white px-2 py-px text-[11px] font-bold text-emerald-600" label="提供済み" desc="すでに利用可能" />
            <LegendItem badge="rounded-full border-2 border-amber-400 bg-white px-2 py-px text-[11px] font-bold text-amber-600" label="次回リリース" desc="2026年7月予定" />
            <LegendItem badge="rounded-full border-2 border-indigo-400 bg-white px-2 py-px text-[11px] font-bold text-indigo-600" label="その後のリリース" desc="2026年9月予定" />
            <LegendItem badge="rounded-full border-2 border-stone-400 bg-white px-2 py-px text-[11px] font-bold text-stone-500" label="時期未定" desc="リリース日未確定" />
            <LegendItem badge="rounded border-2 border-pink-400 bg-white px-1.5 py-px text-[10px] font-bold text-pink-600" label="新規" desc="令和6年基準で新設" />
            <LegendItem badge="rounded border-2 border-blue-400 bg-white px-1.5 py-px text-[10px] font-bold text-blue-600" label="修正" desc="既存機能を改修" />
          </div>
        </div>

        {/* フェーズ一覧 */}
        <div className="space-y-5">
          {PHASES.map((phase, i) => {
            const badge = BADGE_STYLES[phase.status];
            return (
              <div key={i} className="border-b last:border-b-0 pb-5 last:pb-0">
                {/* フェーズヘッダー */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${badge.bg} ${badge.text}`}>
                    {badge.label}
                  </span>
                  <span className="font-bold text-sm text-slate-800">{phase.title}</span>
                  <span className="ml-auto text-xs text-slate-400 shrink-0">{phase.date}</span>
                </div>

                {/* カテゴリ */}
                <div className="space-y-2">
                  {phase.categories.map((cat, j) => (
                    <div key={j} className="grid grid-cols-[80px_1fr] gap-2 items-start">
                      <span className="text-[11px] font-bold text-stone-500 pt-1 leading-snug">{cat.label}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.items.map((item, k) => (
                          <ItemChip key={k} item={item} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* 時期未定 */}
          <div className="rounded-lg bg-stone-50 border border-stone-200 px-4 py-3">
            <div className="text-xs font-bold text-stone-500 mb-2">時期未定 ─ リリース日が確定していない機能</div>
            <div className="flex flex-wrap gap-1.5">
              {TBD_ITEMS.map((item, i) => (
                <span key={i} className="flex items-center gap-1 rounded px-2 py-0.5 text-xs bg-stone-200 text-stone-600 leading-snug">
                  {item.label}
                  {item.alert && (
                    <span className="rounded px-1 py-px text-[10px] font-bold bg-red-600 text-white">要注意</span>
                  )}
                  {item.tag && (
                    <span className={`rounded px-1 py-px text-[10px] font-bold ${TAG_STYLES[item.tag].bg} ${TAG_STYLES[item.tag].text}`}>
                      {TAG_STYLES[item.tag].label}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 脚注 */}
        <p className="text-[11px] text-stone-400 pt-3 leading-relaxed">
          ※「月次計算書」は月次・決算ともに7月リリース予定です。ユーザーからのお問い合わせ時は、月次・決算どちらの用途かをご確認ください。<br />
          ※「標準メニュー」と「起案メニュー」の2種があり、一部帳票の提供時期が異なる場合があります。詳細は開発チームに確認してください。<br />
          ★ 印は問い合わせ頻度の高い帳票です。
        </p>
      </div>
    </div>
  );
}
