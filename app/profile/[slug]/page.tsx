'use client';

import React, { useState } from 'react';
import { profiles } from '@/lib/posts/profiles';
import Link from 'next/link';

export default function ProfileDetailPage({ params }: { params: { slug: string } }) {
  const [isGrayscale, setIsGrayscale] = useState(true);
  
  const userInfo: any = profiles.find(p => p.slug === params.slug);

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-[#4f5863] flex items-center justify-center text-zinc-800 font-mono italic">
        {`[ ERROR: SUBJECT_NOT_FOUND ]`}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#a8afb7] text-[#111827] px-4 py-8 md:p-8 selection:bg-[#5f6b78] selection:text-slate-950 font-mono">
      <div className="max-w-4xl mx-auto">
        
        <Link 
          href="/?tab=profile" 
          className="text-[#23384f] hover:text-[#111827] mb-12 inline-block transition-colors font-mono text-[10px] tracking-[0.4em] font-bold"
        >
          {`[ ← RETURN_TO_DIRECTORY ]`}
        </Link>

        <div className="relative border border-[#4f5863] bg-[#8f98a3]/35 backdrop-blur-2xl p-6 md:p-14 shadow-[0_0_28px_rgba(0,0,0,0.10)] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none bg-[url('/noisy-background.jpg')]" />
          <div className="absolute inset-[-20%] opacity-[0.07] pointer-events-none select-none overflow-hidden">
            <div className="absolute inset-[-60%] md:inset-[-40%] -rotate-12 text-[9px] text-[#5f6b78] tracking-[0.04em] md:tracking-[0.08em] leading-4 blur-[0.4px] min-w-[400%]">
              {Array(80).fill(null).map((_, i) => (
                <div
                  key={i}
                  className={`whitespace-nowrap ${i % 2 === 0 ? 'translate-x-0 opacity-70' : 'translate-x-24 opacity-45'}`}
                >  
                  {"TAEHON_SECURE_ID DEUNIVERSE_PROTOCOL CLASSIFIED_ARCHIVE SUBJECT_DATA_STREAM TAEHON_DATABASE INTERNAL_ACCESS_NODE ARCHIVE_SIGNAL IDENTITY_VERIFICATION PRIVATE LOG".repeat(20)}
                </div>
              ))}
            </div>  
          </div>
          <div className="relative z-10 animate-in fade-in duration-1000">
            
            {/* 상단 프로필 사진 및 이름 영역 */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start mb-16 border-b border-[#4f5863]/40 pb-12">
              <div className="relative flex-shrink-0">
                <div 
                  className="w-40 h-52 md:w-52 md:h-64 relative border-2 border-[#4f5863] bg-[#6b7280]/30 cursor-pointer overflow-hidden"
                  onClick={() => setIsGrayscale(!isGrayscale)}
                >
                  <img 
                    src={userInfo.image} 
                    alt="Subject Profile" 
                    className={`w-full h-full object-cover transition-all duration-1000 ${
                      isGrayscale ? 'grayscale contrast-125 opacity-80' : 'grayscale-0 contrast-100 opacity-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.08)_50%)] bg-[length:100%_5px] pointer-events-none opacity-10" />
                </div>
              </div>

              <div className="flex-1 w-full pt-2 md:pt-4 text-center md:text-left">
                <h2 className="text-[11px] tracking-[0.25em] md:tracking-[0.6em] text-[#7a4b4b] font-bold mb-4 uppercase">
                  Subject Identification
                </h2>
                <h3 className="text-3xl md:text-6xl font-extrabold tracking-[-0.04em] md:tracking-[-0.06em] uppercase text-[#cfd5dc] mb-8 md:mb-10">
                  {userInfo.name}
                </h3>
                <div className="inline-flex flex-col border-l-4 border-[#7a4b4b] pl-5 md:pl-6 max-w-full">
                  <span className="text-[10px] text-[#5f6b78] tracking-[0.2em] md:tracking-[0.4em] uppercase mb-1 font-bold">Clearance Level</span>
                  <span className="text-base md:text-lg text-[#7a4b4b] font-bold tracking-[0.08em] md:tracking-[0.2em] uppercase leading-relaxed break-words">{userInfo.clearance}</span>
                </div>
              </div>
            </div>

            {/* 상세 정보 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-7 text-[13px]">
              
              <div className="space-y-8">
                
                {/* 1. 소속 (Affiliation) */}
                <div>
                  <span className="block text-[11px] text-[#5f6b78] tracking-[0.3em] uppercase mb-2 font-bold">Affiliation</span>
                  <span className="text-[#111827] tracking-wider font-bold">{userInfo.affiliation}</span>
                </div>

                {/* 2. 포지션 (Position) */}
                <div>
                  <span className="block text-[11px] text-[#5f6b78] tracking-[0.3em] uppercase mb-2 font-bold">Position</span>
                  <span className="text-[#111827] tracking-wider font-medium">{userInfo.position}</span>
                </div>

                {/* 3. 나이 / 성별 (Age / Gender) */}
                <div>
                  <span className="block text-[11px] text-[#5f6b78] tracking-[0.3em] uppercase mb-2 font-bold">
                    Age / Gender
                  </span>
                  <span className="text-[#111827] tracking-wider font-medium">
                    {userInfo.age || '?'} <span className="text-[#5f6b78] mx-2">/</span> {userInfo.gender || '?'}
                  </span>
                </div>

              </div>

              <div className="space-y-8">
                <div>
                  <span className="block text-[11px] text-[#5f6b78] tracking-[0.3em] uppercase mb-2 font-bold">Status</span>
                  <span className="text-[#7a4b4b] tracking-[0.4em] animate-pulse font-bold">{userInfo.status}</span>
                </div>
                <div>
                  <span className="block text-[11px] text-[#5f6b78] tracking-[0.3em] uppercase mb-2 font-bold">Internal Note</span>
                  <p className="text-[#111827] italic leading-relaxed bg-[#b7bec6]/35 p-4 border-l border-[#4f5863]">
                    "{userInfo.internalNote}"
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-14 pt-8 border-t border-[#4f5863]/40 flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-start md:items-center">
              <div className="flex space-x-1 opacity-90">
                {[...Array(24)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-6 bg-slate-500 ${i % 3 === 0 ? 'w-[4px]' : 'w-[1px]'} ${i % 7 === 0 ? 'opacity-30' : 'opacity-100'}`} 
                  />
                ))}
              </div>
              <span className="text-[10px] text-[#5f6b78] tracking-[0.2em] md:tracking-[0.6em] uppercase font-bold">
                SECURE_NODE_IDENT ｜ {userInfo.identCode}
              </span>
            </div>

          </div>
        </div>
        
        <footer className="mt-20 mb-10 text-center opacity-20">
          <p className="text-[9px] tracking-[0.5em] uppercase">TaehOn Intelligence Protocol active</p>
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
