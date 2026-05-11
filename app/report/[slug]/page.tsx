'use client';

import React from 'react'; // React 기능을 쓰기 위해 추가
import Link from 'next/link';
import { choijaeyoung } from '@/lib/posts/choijaeyoung';
import { gongmingu } from '@/lib/posts/gongmingu'; 
import { sosaeon } from '@/lib/posts/sosaeon';

export default function ReportDetailPage({ params }: { params: { slug: string } }) {
  
  // [우편함] 슬러그와 데이터 연결
  const posts: any = {
    'choijaeyoung': choijaeyoung,
    'gongmingu': gongmingu,
    'sosaeon': sosaeon,
  };

  const post = posts[params.slug];

  // 데이터 없음 에러 처리
  if (!post) {
    return (
      <div className="min-h-screen bg-[#4f5863] flex items-center justify-center text-zinc-800 font-mono italic">
        {`[ ERROR: REPORT_NOT_FOUND ]`}
      </div>
    );
  }

  // 위험 등급 스타일 함수
  const getDangerStyle = (level: string) => {
    switch (level?.toUpperCase()) {
      case 'NEGLIGIBLE': return "text-[#5f6b78] border-[#4f5863]/40 bg-[#b7bec6]/20";
      case 'MODERATE':   return "text-[#8a7b5c] border-[#8a7b5c]/40 bg-[#8a7b5c]/10";
      case 'HIGH':       return "text-[#9b6a52] border-[#9b6a52]/40 bg-[#9b6a52]/10";
      case 'EXTREME':    return "text-[#7a4b4b] border-[#7a4b4b]/40 bg-[#7a4b4b]/10 animate-pulse";
      case 'CRITICAL':   return "text-[#6a3434] border-[#6a3434] bg-[#6a3434]/20 animate-pulse font-extrabold";
      default:           return "text-[#4f5863] border-[#5f6b78]/40 bg-[#b7bec6]/10";
    }
  };

  const dangerLevel = post.dangerLevel || 'EXTREME';
  const sections = post.content.split('* * *');

  return (
    <div className="min-h-screen bg-[#a8afb7] text-[#111827] p-8 selection:bg-[#5f6b78] selection:text-slate-950">
      <div className="max-w-2xl mx-auto">
        <Link href="/?tab=report" className="text-[#23384f] hover:text-[#111827] mb-16 inline-block transition-colors font-mono text-[10px] tracking-[0.3em]">
          {`[ ← RETURN_TO_REPORT ]`}
        </Link>
        
        <header className="mb-16 border-l border-[#4f5863] pl-6">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-[10px] font-mono border px-2 py-0.5 tracking-[0.2em] ${getDangerStyle(dangerLevel)}`}>
              DANGER_LEVEL: {dangerLevel}
            </span>
            <span className="text-[10px] text-[#5f6b78] font-mono uppercase tracking-widest">
              Character Analysis
            </span>
          </div>

          <h1 className="text-xl font-semibold text-[#111827] mb-4 tracking-tight leading-relaxed">
            {post.title}
          </h1>
          
          <div className="flex gap-4 text-[10px] text-[#5f6b78] tracking-[0.2em] font-mono uppercase">
            <span>Date: {post.date}</span>
            <span>|</span>
            <span>Subject: {post.subject || 'Unknown'}</span> 
          </div>
        </header>

        {/* [수정됨] *** 을 만나면 멋진 구분선으로 바꿔주는 코드 적용 */}
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

        <footer className="mt-32 mb-10 text-center border-t border-[#4f5863]/40 pt-10">
          <p className="text-[#5f6b78] text-[9px] font-mono tracking-widest leading-loose uppercase">
            {`Confidential Information`} <br />
            {`DEUNIVERSE CHARACTER ANALYSIS REPORT`}
          </p>
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
