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
  ];

  return (
    <div className="p-4 border border-zinc-800 bg-black/50 font-mono text-sm text-zinc-200">
      <div className="mb-4 text-zinc-500 border-b border-zinc-800 pb-2">
        {`> LOG_ARCHIVE`}
      </div>
      
      <div className="space-y-2">
        {logs.map((log) => (
          <Link key={log.id} href={`/logs/${log.slug}`}>
            <div className="flex justify-between hover:bg-zinc-900 p-2 cursor-pointer transition-colors border-b border-zinc-900/50 mb-1">
              <span className="text-zinc-400">[{log.id}]</span>
              <span className="text-zinc-200 flex-1 ml-4">{log.title}</span>
              <span className="text-zinc-600">{log.status}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InternalLogs;