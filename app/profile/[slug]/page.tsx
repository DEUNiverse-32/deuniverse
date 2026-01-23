'use client';

import React, { useState } from 'react';
import { profiles } from '@/lib/posts/profiles';
import Link from 'next/link';

export default function ProfileDetailPage({ params }: { params: { slug: string } }) {
  const [isGrayscale, setIsGrayscale] = useState(true);
  
  // URL 슬러그와 일치하는 인물 데이터를 찾습니다.
  const userInfo = profiles.find(p => p.slug === params.slug);

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-800 font-mono italic">
        {`[ ERROR: SUBJECT_NOT_FOUND ]`}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-100 p-8 selection:bg-red-900/30 selection:text-white font-mono">
      <div className="max-w-4xl mx-auto">
        
        {/* 목록으로 돌아가는 버튼: 정체성을 잃지 않도록 Red 포인트 유지 */}
        <Link 
          href="/?tab=profile" 
          className="text-zinc-700 hover:text-red-900 mb-12 inline-block transition-colors font-mono text-[10px] tracking-[0.4em] font-bold"
        >
          {`[ ← RETURN_TO_DIRECTORY ]`}
        </Link>

        {/* 메인 서류 레이아웃 */}
        <div className="relative border border-slate-800 bg-[#0f0f12]/80 backdrop-blur-2xl p-8 md:p-14 shadow-2xl overflow-hidden">
          
          {/* 배경 패턴: 네가 넣었던 TAEHON_SECURE_ID_ 반복 */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none text-[9px] text-slate-300 break-all leading-none">
            {Array(150).fill("TAEHON_SECURE_ID_").join("")}
          </div>

          <div className="relative z-10 animate-in fade-in duration-1000">
            {/* 상단 섹션: 사진 및 주요 식별 정보 */}
            <div className="flex flex-col md:flex-row gap-12 items-start mb-16 border-b border-red-900/40 pb-12">
              
              {/* 사진 영역 */}
              <div className="relative flex-shrink-0">
                <div 
                  className="w-44 h-56 md:w-52 md:h-64 relative border-2 border-slate-700 bg-black cursor-pointer overflow-hidden"
                  onClick={() => setIsGrayscale(!isGrayscale)}
                >
                  <img 
                    src={userInfo.image} 
                    alt="Subject Profile" 
                    className={`w-full h-full object-cover transition-all duration-1000 ${
                      isGrayscale ? 'grayscale contrast-125 opacity-80' : 'grayscale-0 contrast-100 opacity-100'
                    }`}
                  />
                  {/* 스캔라인 효과 */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30" />
                </div>
                <p className="text-[9px] text-zinc-700 mt-2 text-center tracking-widest uppercase"></p>
              </div>

              {/* 이름 및 보안 등급 */}
              <div className="flex-1 w-full pt-4">
                <h2 className="text-[11px] tracking-[0.6em] text-red-700 font-bold mb-4 uppercase">
                  Subject Identification
                </h2>
                <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter uppercase text-slate-100 mb-10">
                  {userInfo.name}
                </h3>
                <div className="inline-flex flex-col border-l-4 border-red-800 pl-6">
                  <span className="text-[10px] text-slate-400 tracking-[0.4em] uppercase mb-1 font-bold">Clearance Level</span>
                  <span className="text-lg text-red-600 font-bold tracking-[0.2em] uppercase">{userInfo.clearance}</span>
                </div>
              </div>
            </div>

            {/* 상세 정보 그리드 영역 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 text-[13px]">
              <div className="space-y-8">
                <div>
                  <span className="block text-[11px] text-slate-400 tracking-[0.3em] uppercase mb-2 font-bold">Position</span>
                  <span className="text-slate-200 tracking-wider font-medium">{userInfo.position}</span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-400 tracking-[0.3em] uppercase mb-2 font-bold">Affiliation</span>
                  <span className="text-slate-200 tracking-wider font-bold">{userInfo.affiliation}</span>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <span className="block text-[11px] text-slate-400 tracking-[0.3em] uppercase mb-2 font-bold">Status</span>
                  <span className="text-red-600 tracking-[0.4em] animate-pulse font-bold">{userInfo.status}</span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-400 tracking-[0.3em] uppercase mb-2 font-bold">Internal Note</span>
                  <p className="text-slate-200 italic leading-relaxed bg-slate-900/40 p-4 border-l border-slate-700">
                    "{userInfo.internalNote}"
                  </p>
                </div>
              </div>
            </div>

            {/* 하단 바코드 및 식별 코드: 네가 원했던 디자인 그대로 복구 */}
            <div className="mt-20 pt-8 border-t border-slate-800/80 flex justify-between items-center">
              <div className="flex space-x-1 opacity-90">
                {[...Array(24)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-6 bg-slate-500 ${i % 3 === 0 ? 'w-[4px]' : 'w-[1px]'} ${i % 7 === 0 ? 'opacity-30' : 'opacity-100'}`} 
                  />
                ))}
              </div>
              <span className="text-[10px] text-slate-400 tracking-[0.6em] uppercase font-bold">
                SECURE_NODE_IDENT ｜ {userInfo.identCode}
              </span>
            </div>

          </div>
        </div>
        
        <footer className="mt-20 mb-10 text-center opacity-20">
          <p className="text-[9px] tracking-[0.5em] uppercase">TaehOn Intelligence Protocol active</p>
        </footer>
      </div>
    </div>
  );
}