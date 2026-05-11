'use client';

import React from 'react';
import { russianRoulette } from '@/lib/posts/russianroulette';
import { traces } from '@/lib/posts/traces';
import { HBD } from '@/lib/posts/HBD';
import Link from 'next/link';

export default function LogDetailPage({ params }: { params: { slug: string } }) {
  
  // 여러 개의 로그를 처리할 수 있도록 '우편함' 설정
  const posts: any = {
    'russianRoulette': russianRoulette,
    'traces': traces,
    'HBD': HBD,
  };

  const post = posts[params.slug];

  // 에러 처리 (데이터가 없을 때)
  if (!post) {
    return (
      <div className="min-h-screen bg-[#a8afb7] flex flex-col items-center justify-center font-sans text-zinc-700 gap-6">
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

  const sections = post.content.split('* * *');

  return (
    <div className="min-h-screen bg-[#a8afb7] text-[#111827] p-8 selection:bg-[#5f6b78] selection:text-slate-950">
      <div className="max-w-xl mx-auto">
        
        {/* 뒤로 가기 버튼 */}
        <Link href="/?tab=log" className="text-[#23384f] hover:text-[#111827] mb-12 inline-block transition-colors font-mono text-xs tracking-widest">
          {`[ ← RETURN_TO_LOGS ]`}
        </Link>
        
        {/* 헤더 영역 */}
        <header className="mb-12 border-l border-[#4f5863] pl-6 font-mono">
          <h1 className="text-xl font-bold text-[#111827] mb-2 tracking-tight">
            {post.title}
          </h1>
          <div className="flex gap-3 text-[10px] text-[#5f6b78] tracking-widest uppercase">
            <span>Date: {post.date}</span>
            <span>|</span>
            <span>{post.status || 'OPEN'}</span>
          </div>
        </header>

        {/* 본문 영역 (*** 자동 변환 기능 추가됨) */}
        <article className="font-sans text-sm leading-8 text-[#111827] text-justify">
        {sections.map((section: string, sectionIndex: number) => {
            
            const lines = section.split(/\r?\n/);
            let isOffset = false;

            return (
              <React.Fragment key={sectionIndex}>

                {lines.map((line:string, lineIndex: number) => {

                  if (line.trim() === '[[offset]]') {
                    isOffset = true;
                    return null;
                  }

                  if (line.trim() === '[[/offset]]') {
                    isOffset = false;
                    return null;
                  }

                  if (!line.trim()) {
                    return <div key={lineIndex} className="h-6" />;
                  }

                  return (
                    <p
                      key={lineIndex}
                      className={
                        isOffset
                          ? 'ml-40 italic opacity-90 my-10 whitespace-pre-wrap text-right'
                          : 'whitespace-pre-wrap mb-6'
                      }
                    >
                      {line}
                    </p>  
                  );
                })}

                {sectionIndex < sections.length - 1 && (
                  <div className="w-full text-center py-12 select-none">
                    <span className="text-[#5f6b78] font-serif text-xs tracking-[1.2em] opacity-70">
                      * * *
                    </span>
                  </div>
               )}

            </React.Fragment>
            );
          })}
        </article>

        <footer className="mt-24 pt-8 border-t border-[#4f5863]/40 text-[#5f6b78] text-[10px] text-center font-mono tracking-[0.2em]">
          {`© DEUNIVERSE ｜ AUTHORIZED_PERSONNEL_ONLY`}
        </footer>

        <button
         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}
         className="fixed bottom-4 right-4 z-50 text-[#5f6b78]/55 hover:text-[#23384f] font-mono text-[9px] tracking-[0.25em] transition-all"
         >
          ↑ TOP
        </button>

      </div>
    </div>
  );
}
