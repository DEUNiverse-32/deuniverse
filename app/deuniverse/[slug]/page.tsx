import { goodbye } from '@/lib/posts/goodbye';
import Link from 'next/link';

export default function DeuniverseDetailPage({ params }: { params: { slug: string } }) {
  const post = params.slug === 'goodbye' ? goodbye : null;

  if (!post) return <div className="p-10 text-zinc-800 font-mono italic">DATA_NOT_FOUND</div>;

  return (
    <div className="min-h-screen bg-black text-zinc-400 p-8 selection:bg-zinc-900 selection:text-zinc-200">
      <div className="max-w-xl mx-auto">
        <Link href="/?tab=deuniverse" className="text-zinc-700 hover:text-zinc-500 mb-16 inline-block transition-colors font-mono text-[10px] tracking-[0.3em]">
          {`[ RETURN_TO_DEUNIVERSE ]`}
        </Link>
        
        <header className="mb-12 border-l border-zinc-800 pl-6">
          {/* 상세 페이지 상단 제목 */}
          <h1 className="text-xl font-bold text-zinc-100 mb-3 tracking-tight">
            {post.title}
          </h1>
          <p className="text-[10px] text-zinc-600 tracking-[0.5em] font-mono uppercase">
            RECORDED ON : {post.date}
          </p>
        </header>

        <article className="font-serif text-[13px] leading-8 whitespace-pre-wrap text-justify opacity-80">
          {post.content}
        </article>

        <footer className="mt-32 mb-10 text-center">
          <p className="text-zinc-800 text-[9px] font-mono tracking-widest leading-loose uppercase">
            {`Pray for the eternal rest`} <br />
            {`May their path be bright even in moonless nights`}
          </p>
        </footer>
      </div>
    </div>
  );
}