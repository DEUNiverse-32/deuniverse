import React from 'react';
import { russianRoulette } from '@/lib/posts/russianroulette';
import { traces } from '@/lib/posts/traces';
import Link from 'next/link';

export default function LogDetailPage({ params }: { params: { slug: string } }) {
  
  // 여러 개의 로그를 처리할 수 있도록 '우편함' 설정
  const posts: any = {
    'russianRoulette': russianRoulette,
    'traces': traces,
  };

  const post = posts[params.slug];

  // 에러 처리 (데이터가 없을 때)
  if (!post) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-sans text-zinc-700 gap-6">
        <span>{`[ ERROR: DATA_NOT_FOUND ]`}</span>
        
        <Link 
          href="/?tab=log" 
          className="text-zinc-500 hover:text-zinc-300 text-xs tracking-[0.2em] border border-zinc-800 px-4 py-2 transition-colors"
        >
          {`[ ← RETURN_TO_LOGS ]`}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-300 p-8 selection:bg-zinc-800 selection:text-zinc-100">
      <div className="max-w-xl mx-auto">
        
        {/* 뒤로 가기 버튼 */}
        <Link href="/?tab=log" className="text-zinc-600 hover:text-zinc-400 mb-12 inline-block transition-colors font-sans text-xs tracking-widest">
          {`[ ← RETURN_TO_LOGS ]`}
        </Link>
        
        {/* 헤더 영역 */}
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

        {/* 본문 영역 (*** 자동 변환 기능 추가됨) */}
        <article className="font-sans text-sm leading-7 text-zinc-400 text-justify">
          {post.content.split('* * *').map((part: string, index: number, array: string[]) => (
            <React.Fragment key={index}>
              {/* 일반 텍스트 부분 */}
              <span className="whitespace-pre-wrap">{part}</span>
              
              {/* 별표 3개를 만났을 때 보여줄 디자인 */}
              {index < array.length - 1 && (
                <div className="w-full text-center py-12 select-none animate-in fade-in duration-1000">
                  <span className="text-zinc-600 font-serif text-xs tracking-[1.2em] opacity-60">
                    * * *
                  </span>
                </div>
              )}
            </React.Fragment>
          ))}
        </article>

        <footer className="mt-24 pt-8 border-t border-zinc-900 text-zinc-800 text-[10px] text-center font-sans tracking-[0.2em]">
          {`© DEUNIVERSE ｜ AUTHORIZED_PERSONNEL_ONLY`}
        </footer>
      </div>
    </div>
  );
}
