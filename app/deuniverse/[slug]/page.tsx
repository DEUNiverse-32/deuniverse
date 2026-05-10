"use client"; // 이 줄이 맨 위에 있어야 에러가 안 나

import React from 'react';
import { goodbye } from '@/lib/posts/goodbye';
import { hdk } from '@/lib/posts/hdk';
import { breath } from '@/lib/posts/breath';
import { breath2 } from '@/lib/posts/breath2';
import Link from 'next/link';

export default function DeuniverseDetailPage({ params }: { params: { slug: string } }) {
  
  // 모든 글 목록 연결 (우편함)
  const posts: any = {
    'goodbye': goodbye,
    'hdk': hdk,
    'breath': breath,
    'breath2': breath2
  };

  const post = posts[params.slug];

  if (!post) return <div className="p-10 text-[#5f6b78] font-mono italic">DATA_NOT_FOUND</div>;

  const sections = post.content.split('* * *');

  return (
    <div className="min-h-screen bg-[#a8afb7] text-[#111827] p-8 selection:bg-[#5f6b78] selection:text-slate-950">
      <div className="max-w-xl mx-auto">
        <Link href="/?tab=deuniverse" className="text-[#23384f] hover:text-[#111827] mb-16 inline-block transition-colors font-mono text-[10px] tracking-[0.3em]">
          {`[ RETURN_TO_DEUNIVERSE ]`}
        </Link>
        
        <header className="mb-12 border-l border-[#4f5863]/40 pl-6">
          <h1 className="text-xl font-semibold text-[#23384f] mb-3 tracking-tight">
            {post.title}
          </h1>
          <p className="text-[10px] text-[#5f6b78] tracking-[0.5em] font-mono uppercase">
            RECORDED ON : {post.date}
          </p>
        </header>

        {/* 여기가 핵심! *** 을 만나면 멋진 장식으로 바꿔주는 코드 */}
        <article className="font-serif text-[13px] leading-[2.1] text-[#111827] text-justify">
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

        <footer className="mt-32 mb-10 text-center">
          <p className="text-[#5f6b78] text-[9px] font-mono tracking-widest leading-loose uppercase">
            {`Fragments of the universe, drifting in silence.`} <br />
            {`Where reality fades and the unwritten begins`}
          </p>
        </footer>
      </div>
    </div>
  );
}
