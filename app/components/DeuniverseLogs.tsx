"use client";

import React from 'react';
import Link from 'next/link';
import { goodbye } from '@/lib/posts/goodbye';

const DeuniverseLogs = () => {
  const posts = [goodbye]; 

  return (
    <div className="p-4 border border-zinc-800 bg-black/30 font-sans text-sm text-zinc-300">
      <div className="mb-4 text-zinc-500 border-b border-zinc-800 pb-2 font-mono italic">
        {`DEUNIVERSE_ARCHIVE`}
      </div>
      
      <div className="space-y-1">
        {posts.map((post) => (
          <Link key={post.slug} href={`/deuniverse/${post.slug}`}>
            <div className="group flex justify-between hover:bg-zinc-900/50 p-3 cursor-pointer transition-all border border-transparent hover:border-zinc-800">
              <div className="flex flex-col">
                {/* 제목: 강조하고 싶은 부분 */}
                <span className="text-zinc-200 font-medium group-hover:text-white mb-1 transition-colors">
                  {post.title}
                </span>
                {/* 한글 부제와 날짜 */}
                <span className="text-zinc-600 text-[10px] tracking-tighter">
                RECORDED ON ｜ {post.date}
                </span>
              </div>
              <span className="text-[10px] text-zinc-700 self-center font-mono italic">
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