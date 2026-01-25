import React from 'react'; // React 기능을 쓰기 위해 추가
import Link from 'next/link';
import { choijaeyoung } from '@/lib/posts/choijaeyoung';
import { gongmingu } from '@/lib/posts/gongmingu'; 

export default function ReportDetailPage({ params }: { params: { slug: string } }) {
  
  // [우편함] 슬러그와 데이터 연결
  const posts: any = {
    'choijaeyoung': choijaeyoung,
    'gongmingu': gongmingu,
  };

  const post = posts[params.slug];

  // 데이터 없음 에러 처리
  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-800 font-mono italic">
        {`[ ERROR: REPORT_NOT_FOUND ]`}
      </div>
    );
  }

  // 위험 등급 스타일 함수
  const getDangerStyle = (level: string) => {
    switch (level?.toUpperCase()) {
      case 'NEGLIGIBLE': return "text-zinc-500 border-zinc-800 bg-zinc-900/10";
      case 'MODERATE':   return "text-yellow-600 border-yellow-900/30 bg-yellow-950/10";
      case 'HIGH':       return "text-orange-600 border-orange-900/30 bg-orange-950/10";
      case 'EXTREME':    return "text-red-600 border-red-900/30 bg-red-950/10 animate-pulse";
      case 'CRITICAL':   return "text-red-900 border-red-950 bg-red-950/20 animate-pulse font-extrabold";
      default:           return "text-red-500 border-red-900/30 bg-red-950/10";
    }
  };

  const dangerLevel = post.dangerLevel || 'EXTREME';

  return (
    <div className="min-h-screen bg-black text-zinc-400 p-8 selection:bg-red-900/30 selection:text-zinc-200">
      <div className="max-w-xl mx-auto">
        <Link href="/?tab=report" className="text-zinc-700 hover:text-zinc-500 mb-16 inline-block transition-colors font-mono text-[10px] tracking-[0.3em]">
          {`[ ← RETURN_TO_REPORT ]`}
        </Link>
        
        <header className="mb-16 border-l border-zinc-900 pl-6">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-[10px] font-mono border px-2 py-0.5 tracking-[0.2em] ${getDangerStyle(dangerLevel)}`}>
              DANGER_LEVEL: {dangerLevel}
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
            <span>Subject: {post.subject || 'Unknown'}</span> 
          </div>
        </header>

        {/* [수정됨] *** 을 만나면 멋진 구분선으로 바꿔주는 코드 적용 */}
        <article className="font-serif text-[13px] leading-8 text-justify opacity-80">
          {post.content.split('* * *').map((part: string, index: number, array: string[]) => (
            <React.Fragment key={index}>
              {/* 일반 텍스트 부분 */}
              <span className="whitespace-pre-wrap">{part}</span>
              
              {/* 별표 3개(***)가 있던 자리에 들어갈 디자인 */}
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
