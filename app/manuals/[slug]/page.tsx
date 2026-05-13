import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllManuals, getManualBySlug } from "@/lib/content";

export async function generateStaticParams() {
  return getAllManuals().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getManualBySlug(slug);
  return { title: item ? `${item.title} | 運用マニュアル` : "Not Found" };
}

export default async function ManualDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getManualBySlug(slug);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/manuals"
        className="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800"
      >
        ← 運用マニュアル一覧へ
      </Link>

      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mb-1 text-xs font-medium text-blue-600">運用マニュアル</div>
        <h1 className="mb-1 text-2xl font-extrabold tracking-tight">{item.title}</h1>
        {item.description && (
          <p className="mb-4 text-sm text-slate-500">{item.description}</p>
        )}
        <div className="mb-6 text-xs text-slate-400">最終更新: {item.updated_at}</div>

        <hr className="mb-6 border-slate-100" />

        <div className="prose prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
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
              blockquote(props) {
                return (
                  <blockquote
                    className="border-l-4 border-amber-400 bg-amber-50 px-4 py-3 text-slate-700 not-italic [&_p:first-of-type]:before:content-none [&_p:last-of-type]:after:content-none"
                    {...props}
                  />
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
