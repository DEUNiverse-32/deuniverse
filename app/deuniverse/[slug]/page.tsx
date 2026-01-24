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

  if (!post) return <div className="p-10 text-zinc-800 font-mono italic">DATA_NOT_FOUND</div>;

  return (
    <div className="min-h-screen bg-black text-zinc-400 p-8 selection:bg-zinc-900 selection:text-zinc-200">
      <div className="max-w-xl mx-auto">
        <Link href="/?tab=deuniverse" className="text-zinc-700 hover:text-zinc-500 mb-16 inline-block transition-colors font-mono text-[10px] tracking-[0.3em]">
          {`[ RETURN_TO_DEUNIVERSE ]`}
        </Link>
        
        <header className="mb-12 border-l border-zinc-800 pl-6">
          <h1 className="text-xl font-bold text-zinc-100 mb-3 tracking-tight">
            {post.title}
          </h1>
          <p className="text-[10px] text-zinc-600 tracking-[0.5em] font-mono uppercase">
            RECORDED ON : {post.date}
          </p>
        </header>

        {/* 여기가 핵심! *** 을 만나면 멋진 장식으로 바꿔주는 코드 */}
        <article className="font-serif text-[13px] leading-8 text-justify opacity-80">
          {post.content.split('* * *').map((part: string, index: number, array: string[]) => (
            <React.Fragment key={index}>
              {/* 일반 텍스트는 줄바꿈 유지해서 보여줌 */}
              <span className="whitespace-pre-wrap">{part}</span>
              
              {/* 별표 3개(***)가 있던 자리에 들어갈 디자인 */}
              {index < array.length - 1 && (
                <div className="w-full text-center py-12 select-none animate-in fade-in duration-1000">
                  <span className="text-zinc-600 font-serif text-xs tracking-[1.2em] opacity-50">
                    * * *
                  </span>
                </div>
              )}
            </React.Fragment>
          ))}
        </article>

        <footer className="mt-32 mb-10 text-center">
          <p className="text-zinc-800 text-[9px] font-mono tracking-widest leading-loose uppercase">
            {`Fragments of the universe, drifting in silence.`} <br />
            {`Where reality fades and the unwritten begins`}
          </p>
        </footer>
      </div>
    </div>
  );
}
