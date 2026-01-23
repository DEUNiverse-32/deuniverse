"use client";

import React from 'react';
import Link from 'next/link';
import { profiles } from '@/lib/posts/profiles';

export default function ProfileLogs() {
  return (
    <div className="p-4 border border-zinc-900 bg-black/40 font-mono text-sm text-zinc-400">
      <div className="mb-6 text-zinc-600 border-b border-zinc-900 pb-2 italic text-[11px]">
        {`> IDENTITY_ARCHIVE`}
      </div>
      
      <div className="space-y-2">
        {profiles.map((profile, index) => (
          <Link key={profile.slug} href={`/profile/${profile.slug}`}>
            <div className="group flex justify-between hover:bg-zinc-900/30 p-4 cursor-pointer transition-all border-b border-zinc-900/30 last:border-0">
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-zinc-700">
                  [{String(index + 1).padStart(3, '0')}]
                </span>
                <span className="text-zinc-200 font-bold group-hover:text-red-700 transition-colors tracking-widest uppercase">
                  {profile.name}
                </span>
              </div>
              
              {/* 우측에는 이제 상태값만 남겨서 여백의 긴장감을 줬어 */}
              <div className="flex items-center">
                <span className="text-[10px] text-zinc-800 group-hover:text-zinc-500 transition-colors uppercase tracking-tighter">
                  {profile.status}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}