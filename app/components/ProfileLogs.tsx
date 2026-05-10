"use client";

import React from 'react';
import Link from 'next/link';
import { profiles } from '@/lib/posts/profiles';

export default function ProfileLogs() {
  return (
    <div className="p-4 border border-[#4f5863] bg-[#8f98a3]/35 font-mono text-sm text-[#4b5563]">
      <div className="mb-6 text-[#5f6b78] border-b border-[#4f5863] pb-2 italic text-[11px] tracking-[0.15em]">
        {`> IDENTITY_ARCHIVE`}
      </div>
      
      <div className="space-y-2">
        {profiles.map((profile, index) => (
          <Link key={profile.slug} href={`/profile/${profile.slug}`}>
            <div className="group flex justify-between hover:bg-[#b7bec6]/40 p-4 cursor-pointer transition-all border-b border-[#4f5863]/30 last:border-0">
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-[#5f6b78]">
                  [{String(index + 1).padStart(3, '0')}]
                </span>
                <span className="text-[#d8dde3] font-bold group-hover:text-[#708499] transition-colors duration-200 tracking-widest uppercase">
                  {profile.name}
                </span>
              </div>
              
              {/* 우측에는 이제 상태값만 남겨서 여백의 긴장감을 줬어 */}
              <div className="flex items-center">
                <span className="text-[10px] text-[#5f6b78] group-hover:text-[#7b838c] transition-colors uppercase tracking-[0.15em]">
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