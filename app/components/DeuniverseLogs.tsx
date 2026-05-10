"use client";

import React from 'react';
import Link from 'next/link';
import { goodbye } from '@/lib/posts/goodbye';
import { hdk } from '@/lib/posts/hdk';
import { breath } from '@/lib/posts/breath';
import { breath2 } from '@/lib/posts/breath2';


const DeuniverseLogs = () => {
  const posts = [goodbye, breath, breath2, hdk]; 

  return (
    <div className="p-4 border border-[#4f5863] bg-[#8f98a3]/35 backdrop-blur-xl font-sans text-sm text-zinc-300">
      <div className="mb-4 text-[#5f6b78] border-b border-[#4f5863]/40 pb-2 font-mono italic">
        {`DEUNIVERSE_ARCHIVE`}
      </div>
      
      <div className="space-y-1">
        {posts.map((post) => (
          <Link key={post.slug} href={`/deuniverse/${post.slug}`}>
            <div className="group flex justify-between hover:bg-[#b7bec6]/20 p-3 cursor-pointer transition-all border border-transparent hover:border-[#4f5863]/30">
              <div className="flex flex-col">
                {/* 제목: 강조하고 싶은 부분 */}
                <span className="text-[#111827] font-medium group-hover:translate-x-1 mb-1 transition-all duration-300">
                  {post.title}
                </span>
                {/* 한글 부제와 날짜 */}
                <span className="text-[#5f6b78] text-[10px] tracking-[0.15em]">
                RECORDED ON ｜ {post.date}
                </span>
              </div>
              <span className="text-[10px] text-[#5f6b78] self-center font-mono italic">
                {`[ OPEN_FILE ]`}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DeuniverseLogs;
