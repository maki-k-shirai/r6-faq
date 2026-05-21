# r6-faq プロジェクトガイド

## FAQを追加・編集するときのルール

### 関連資料の内部リンクを必ず確認する

FAQを新規追加または更新する際は、`content/policies/` および `content/releases/` に関連するコンテンツが存在するかを確認し、ある場合は `related_links` フィールドに追加すること。

**確認先ディレクトリ:**
- `content/policies/` — 社内方針ページ（URL: `/policies/{slug}`）
- `content/releases/` — リリースノートページ（URL: `/releases/{slug}`）

スラグはファイル名から拡張子を除いたもの（例: `other-securities-tax-effect.md` → `/policies/other-securities-tax-effect`）。

**faq.json の `related_links` フォーマット:**

```json
"related_links": [
  { "label": "社内方針：〇〇〇〇", "href": "/policies/slug-name" },
  { "label": "リリースノート：Ver2.7.0.0", "href": "/releases/v2-7-0-0" }
]
```

- `label` は「社内方針：タイトル」または「リリースノート：タイトル」の形式で記述する
- 複数ある場合はすべて列挙する
- 関連資料がない場合はフィールド自体を省略する（空配列にしない）
