"use client";

import React from 'react';
import Link from 'next/link';
import { choijaeyoung } from '@/lib/posts/choijaeyoung';
import { gongmingu } from '@/lib/posts/gongmingu';

const ReportLogs = () => {
  const reports = [choijaeyoung, gongmingu]; 

  // 위험 등급별 색상을 정해주는 함수야
  const getBadgeStyle = (level: string) => {
    switch (level) {
      case 'NEGLIGIBLE': // 경미: 회색
        return 'border-zinc-800 bg-zinc-900/50 text-zinc-500';
      case 'MODERATE':   // 주의: 노란색
        return 'border-yellow-900/50 bg-yellow-950/20 text-yellow-500';
      case 'HIGH':       // 위협: 주황색 (이제 여기서 주황색이 돼!)
        return 'border-orange-900/50 bg-orange-950/20 text-orange-500';
      case 'EXTREME':    // 극심: 빨간색
        return 'border-red-900/50 bg-red-950/20 text-red-500';
      case 'CRITICAL':   // 치명: 더 진한 빨간색 + 굵게
        return 'border-red-950 bg-red-950/40 text-red-600 font-bold';
      default:           // 기본값
        return 'border-zinc-800 text-zinc-500';
    }
  };

  return (
    <div className="p-4 border border-zinc-800 bg-black/40 font-sans text-sm text-zinc-300">
      <div className="mb-4 text-zinc-500 border-b border-zinc-800 pb-2 font-mono italic">
        {`DATABASE_SYSTEM: CHARACTER_REPORTS`}
      </div>
      
      <div className="space-y-1">
        {reports.map((report) => (
          <Link key={report.slug} href={`/report/${report.slug}`}>
            <div className="group flex justify-between hover:bg-zinc-900/60 p-3 cursor-pointer transition-all border border-transparent hover:border-zinc-800">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  
                  {/* 함수를 써서 이제 등급에 맞는 색깔이 딱딱 들어갈 거야 */}
                  <span className={`text-[9px] px-1.5 py-0.5 border font-mono tracking-tighter uppercase ${getBadgeStyle(report.dangerLevel)}`}>
                    {report.dangerLevel || 'UNKNOWN'}
                  </span>

                  <span className="text-zinc-200 font-medium group-hover:text-white transition-colors">
                    {report.title}
                  </span>
                </div>
                <span className="text-zinc-600 text-[10px] uppercase tracking-tighter ml-1">
                  기록일: {report.date}
                </span>
              </div>
              <span className="text-[10px] text-zinc-700 self-center border border-zinc-800 px-2 py-1 font-mono">
                {report.status || 'Archived'}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReportLogs;
