import Link from "next/link";
import { notFound } from "next/navigation";
import { news } from "../newsData";

export function generateStaticParams() {
  return news.map((article) => ({ slug: article.slug }));
}


export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = news.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <main className="min-h-screen bg-white px-6 py-12 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <Link href="/news" className="text-sm font-semibold text-blue-700 hover:text-blue-900">← Back to news</Link>
        <div className="mt-8"><p className="text-sm font-bold uppercase tracking-wider text-blue-700">{article.category} · {article.date}</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{article.title}</h1><p className="mt-5 text-xl leading-8 text-slate-600">{article.description}</p></div>
        <div className="mt-10 space-y-6 text-lg leading-8 text-slate-700">{article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        {article.category === "Admissions" && <Link href="/admissions/apply" className="mt-9 inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800">Apply Now</Link>}
      </article>
    </main>
  );
}
