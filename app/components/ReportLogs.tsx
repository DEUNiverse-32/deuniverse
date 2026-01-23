"use client";

import React from 'react';
import Link from 'next/link';
import { choijaeyoung } from '@/lib/posts/choijaeyoung';

const ReportLogs = () => {
  const reports = [choijaeyoung]; 

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
                  {/* 위험 등급 태그 디자인 */}
                  <span className="text-[9px] px-1.5 py-0.5 border border-red-900/50 bg-red-950/20 text-red-500 font-mono tracking-tighter uppercase">
                    {report.dangerLevel}
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
                {report.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReportLogs;