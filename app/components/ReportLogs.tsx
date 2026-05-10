"use client";

import React from 'react';
import Link from 'next/link';
import { choijaeyoung } from '@/lib/posts/choijaeyoung';
import { gongmingu } from '@/lib/posts/gongmingu';
import { sosaeon } from '@/lib/posts/sosaeon';

const ReportLogs = () => {
  const reports = [choijaeyoung, gongmingu, sosaeon].filter(Boolean);

  // 위험 등급별 색상을 정해주는 함수야
  const getBadgeStyle = (level: string) => {
    switch (level) {
      case 'NEGLIGIBLE': // 경미: 회색
        return 'border-[#4f5863]/40 bg-[#b7bec6]/20 text-[#5f6b78]';
      case 'MODERATE':   // 주의: 노란색
        return 'border-[#8a7b5c]/40 bg-[#8a7b5c]/10 text-[#8a7b5c]';
      case 'HIGH':       // 위협: 주황색 (이제 여기서 주황색이 돼!)
        return 'border-[#9b6a52]/40 bg-[#9b6a52]/10 text-[#9b6a52]';
      case 'EXTREME':    // 극심: 빨간색
        return 'border-[#7a4b4b]/40 bg-[#7a4b4b]/10 text-[#7a4b4b]';
      case 'CRITICAL':   // 치명: 더 진한 빨간색 + 굵게
        return 'border-[#6a3434] bg-[#6a3434]/20 text-[#6a3434] font-bold';
      default: 'NON-SPECIFIC'          // 기본값
        return 'border-[#5f6b78]/40 bg-[#b7bec6]/10 text-[#4f5863]';
    }
  };

  return (
    <div className="p-4 border border-[#4f5863] bg-[#8f98a3]/35 backdrop-blur-xl font-sans text-sm shadow-[0_0_20px_rgba(0,0,0,0.06)]">
      <div className="mb-4 text-[#5f6b78] border-b border-[#4f5863]/40 pb-3 font-mono tracking-[0.2em] text-[11px] uppercase italic">
        {`DATABASE_SYSTEM : CHARACTER_REPORTS`}
      </div>
      
      <div className="space-y-1">
        {reports.map((report) => (
          <Link key={report.slug} href={`/report/${report.slug}`}>
            <div className="group flex justify-between items-center hover:bg-[#b7bec6]/20 px-3 py-4 cursor-pointer transition-all duration-300 border border-transparent hover:border-[#4f5863]/30">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  
                  {/* 함수를 써서 이제 등급에 맞는 색깔이 딱딱 들어갈 거야 */}
                  <span className={`text-[9px] px-1.5 py-0.5 border font-mono tracking-tighter uppercase ${getBadgeStyle(report.dangerLevel)}`}>
                    {report.dangerLevel || 'UNKNOWN'}
                  </span>

                  <span className="text-[#111827] font-medium tracking-wide group-hover:translate-x-1 transition-all">
                    {report.title}
                  </span>
                </div>
                <span className="text-[#5f6b78] text-[10px] uppercase tracking-[0.15em] ml-1">
                  기록일: {report.date}
                </span>
              </div>
              <span className="text-[10px] text-[#5f6b78] self-center border border-[#4f5863]/40 px-2 py-1 font-mono tracking-[0.15em]">
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
