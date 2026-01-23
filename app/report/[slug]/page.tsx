import { choijaeyoung } from '@/lib/posts/choijaeyoung';
import Link from 'next/link';

export default function ReportDetailPage({ params }: { params: { slug: string } }) {
  // 주소가 'choijaeyoung'일 때 해당 데이터를 가져와
  const post = params.slug === 'choijaeyoung' ? choijaeyoung : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-800 font-mono italic">
        {`[ ERROR: REPORT_NOT_FOUND ]`}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-400 p-8 selection:bg-red-900/30 selection:text-zinc-200">
      <div className="max-w-xl mx-auto">
        <Link href="/?tab=report" className="text-zinc-700 hover:text-zinc-500 mb-16 inline-block transition-colors font-mono text-[10px] tracking-[0.3em]">
          {`[ ← RETURN_TO_REPORT ]`}
        </Link>
        
        {/* 위험 등급에 맞춰 보더 색상을 붉은색(red-900/50)으로 포인트를 줬어 */}
        <header className="mb-16 border-l border-red-900/50 pl-6">
          <div className="flex items-center gap-3 mb-4">
            {/* 위험 등급 태그 */}
            <span className="text-[10px] text-red-500 font-mono border border-red-900/30 px-2 py-0.5 bg-red-950/10 tracking-[0.2em] animate-pulse">
              DANGER_LEVEL: {post.dangerLevel || 'EXTREME'}
            </span>
            <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
              Character Analysis
            </span>
          </div>

          <h1 className="text-xl font-bold text-zinc-100 mb-4 tracking-tight leading-relaxed">
            {post.title}
          </h1>
          
          <div className="flex gap-4 text-[10px] text-zinc-700 tracking-[0.2em] font-mono uppercase">
            <span>Date: {post.date}</span>
            <span>|</span>
            <span>Subject: Choi Jaeyoung</span>
          </div>
        </header>

        {/* 심리 분석에 어울리는 바탕체 스타일 본문 */}
        <article className="font-serif text-[13px] leading-8 whitespace-pre-wrap text-justify opacity-80">
          {post.content}
        </article>

        <footer className="mt-32 mb-10 text-center border-t border-zinc-900 pt-10">
          <p className="text-zinc-800 text-[9px] font-mono tracking-widest leading-loose uppercase">
            {`Confidential Information`} <br />
            {`DEUNIVERSE CHARACTER ANALYSIS REPORT`}
          </p>
        </footer>
      </div>
    </div>
  );
}
