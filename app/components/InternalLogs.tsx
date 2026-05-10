"use client";

import React from 'react';
import Link from 'next/link';

const InternalLogs = () => {
  const logs = [
    { 
      id: 'LOG-001', 
      title: 'Russian Roulette', 
      date: '2025-02-24', 
      status: 'CLASSIFIED', 
      slug: 'russianRoulette' // lib/posts/russianroulette.ts의 slug와 똑같아야 해
    },
    { 
      id: 'LOG-002', 
      title: '10시 10분', 
      date: '2025-11-12', 
      status: 'ARCHIVED', 
      slug: '1010' 
    },
    {
      id: 'LOG-003',
      title: '잔영(殘影)',
      date: '2025-11-02',
      status: 'ARCHIVED',
      slug: 'traces'
    },
    {
      id: 'LOG-004',
      title: '생일 축하해',
      date: '2026-03-02',
      status: 'ARCHIVED',
      slug: 'HBD'
    }
  ];

  return (
    <div className="p-4 border border-[#4f5863] bg-[#8f98a3]/35 backdrop-blur-xl font-mono text-sm shadow-[0_0_20px_rgba(0,0,0,0.06)]">
      <div className="mb-4 text-[#5f6b78] border-b border-[#4f5863]/40 pb-3 tracking-[0.2em] text-[11px] uppercase">
        {`> LOG_ARCHIVE`}
      </div>
      
      <div className="space-y-1">
        {logs.map((log) => (
          <Link key={log.id} href={`/logs/${log.slug}`}>
            <div className="flex justify-between items-center px-3 py-4 border-b border-[#4f5863]/25 hover:bg-[#b7bec6]/20 transition-all duration-300 cursor-pointer group">
              <span className="text-[#5f6b78] tracking-[0.1em]">[{log.id}]</span>
              <span className="text-[#111827] flex-1 ml-6 tracking-wide group-hover:translate-x-1 transition-transform">{log.title}</span>
              <span className="text-[#7a4b4b] text-[11px] tracking-[0.2em] uppercase opacity-70">{log.status}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InternalLogs;
