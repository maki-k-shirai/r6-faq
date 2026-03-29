import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getReleaseItem, getReleaseList } from "@/lib/content";

export async function generateStaticParams() {
  return getReleaseList().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getReleaseItem(slug);
  return { title: item ? `${item.title} | リリース情報` : "Not Found" };
}

export default async function ReleaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getReleaseItem(slug);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/releases"
        className="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800"
      >
        ← リリース情報一覧へ
      </Link>

      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mb-1 text-xs font-medium text-violet-600">リリース情報</div>
        <h1 className="mb-1 text-2xl font-extrabold tracking-tight">{item.title}</h1>
        {item.description && (
          <p className="mb-4 text-sm text-slate-500">{item.description}</p>
        )}
        <div className="mb-6 text-xs text-slate-400">最終更新: {item.updated_at}</div>

        <hr className="mb-6 border-slate-100" />

        <div className="prose prose-sm max-w-none">
          <ReactMarkdown
            components={{
              a(props) {
                const { href, children, ...rest } = props;
                const isExternal = href?.startsWith("http");
                return (
                  <a
                    href={href}
                    {...rest}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-blue-700 underline hover:opacity-80"
                  >
                    {children}
                  </a>
                );
              },
              table(props) {
                return (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm" {...props} />
                  </div>
                );
              },
            }}
          >
            {item.body}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
