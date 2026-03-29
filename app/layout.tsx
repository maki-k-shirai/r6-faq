import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "令和6年基準対応ポータル",
  description: "社内営業・サポート向け 令和6年公益法人会計基準対応プロジェクトポータル",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
