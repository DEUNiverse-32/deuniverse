import { russianRoulette } from '@/lib/posts/russianroulette';
import Link from 'next/link';

export default function LogDetailPage({ params }: { params: { slug: string } }) {
  const post = params.slug === 'russianRoulette' ? russianRoulette : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-sans text-zinc-700">
        {`[ ERROR: DATA_NOT_FOUND ]`}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-300 p-8 selection:bg-zinc-800 selection:text-zinc-100">
      <div className="max-w-xl mx-auto">
        {/* 뒤로 가기 버튼: 이 부분은 가독성을 위해 고딕(font-sans) 유지 */}
        <Link href="/?tab=log" className="text-zinc-600 hover:text-zinc-400 mb-12 inline-block transition-colors font-sans text-xs tracking-widest">
          {`[ ← RETURN_TO_LOGS ]`}
        </Link>
        
        <header className="mb-12 border-l border-zinc-800 pl-6 font-sans">
          <h1 className="text-xl font-bold text-zinc-100 mb-2 tracking-tight">
            {post.title}
          </h1>
          <div className="flex gap-3 text-[10px] text-zinc-600 tracking-widest uppercase">
            <span>Date: {post.date}</span>
            <span>|</span>
            <span>Status: Classified</span>
          </div>
        </header>

        {/* 본문 영역: 
          - font-sans: 고딕체 (깔끔하고 현대적)
          - font-serif: 바탕체 (서정적이고 문학적)
          - text-sm: 작은 글씨 (원래 text-lg에서 줄임)
          - leading-7: 줄 간격을 넓혀서 읽기 편하게 함
        */}
        <article className="font-sans text-sm leading-7 whitespace-pre-wrap text-zinc-400 text-justify">
          {post.content}
        </article>

        <footer className="mt-24 pt-8 border-t border-zinc-900 text-zinc-800 text-[10px] text-center font-sans tracking-[0.2em]">
          {`© DEUNIVERSE ｜ AUTHORIZED_PERSONNEL_ONLY`}
        </footer>
      </div>
    </div>
  );
}