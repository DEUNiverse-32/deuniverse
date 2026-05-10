'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/app/components/Header';
import ProfileLogs from '@/app/components/ProfileLogs';
import InternalLogs from './components/InternalLogs';
import DeuniverseLogs from './components/DeuniverseLogs';
import ReportLogs from './components/ReportLogs';

const WARNING_LINE_1 = "ACCESS RESTRICTED. LEVEL 5 CLEARANCE REQUIRED.";
const WARNING_LINE_2 = "UNAUTHORIZED ACCESS ATTEMPTS WILL BE TRACKED AND NEUTRALIZED.";

function TerminalContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  // 주소창에 ?tab=... 이 있으면 즉시 인증된 것으로 간주해 보안 게이트를 통과시킵니다.
  const [isAuthorized, setIsAuthorized] = useState(!!tabParam);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  
  // 초기 탭 설정을 주소창의 파라미터값으로 동기화합니다.
  const [activeTab, setActiveTab] = useState<string | null>(tabParam || null);
  const [isLoadingTab, setIsLoadingTab] = useState(false);

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
      setIsAuthorized(true);
    }
  }, [tabParam]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isAuthorized) return;
    let i = 0;
    const interval1 = setInterval(() => {
      setTypedText1(WARNING_LINE_1.slice(0, i + 1));
      i++;
      if (i === WARNING_LINE_1.length) {
        clearInterval(interval1);
        let j = 0;
        const interval2 = setInterval(() => {
          setTypedText2(WARNING_LINE_2.slice(0, j + 1));
          j++;
          if (j === WARNING_LINE_2.length) clearInterval(interval2);
        }, 40);
      }
    }, 40);
    return () => clearInterval(interval1);
  }, [isAuthorized]);

  const handleAuthorize = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthorized(true);
      setIsAuthenticating(false);
    }, 1500);
  };

  const handleExternalLink = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm("WARNING: LEAVING SECURE NETWORK. PROCEED TO EXTERNAL MEMORY?")) {
      window.open("https://blog.naver.com/inkedwithyou", "_blank");
    }
  };

  if (!isAuthorized && !isAuthenticating) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#4f5863] text-slate-100 p-6 font-mono">
        <div className="max-w-2xl w-full border border-slate-500/50 p-10 bg-[#41474e] shadow-2xl relative">
          <div className="absolute top-4 right-6 flex items-center space-x-2">
            <span className="text-[10px] text-[#7a4b4b] tracking-widest animate-pulse">● LIVE</span>
            <span className="text-[11px] text-slate-200 font-bold">{currentTime}</span>
          </div>
          <div className="relative z-10 flex flex-col items-center mt-4">
            <h1 className="w-full text-center text-slate-200 font-bold text-xs mb-8 border-b border-slate-500/40 pb-4 tracking-[0.4em]">
              [ TERMINAL ACCESS RESTRICTED ]
            </h1>
            <div className="text-center leading-8 text-[13px] mb-12 min-h-[5rem] tracking-wider uppercase font-bold">
              <p className="text-slate-100">{typedText1}</p>
              <p className="text-slate-300 mt-2">{typedText2}</p>
            </div>
            <button onClick={handleAuthorize} className="w-full max-w-xs py-5 border border-slate-700 text-slate-100 hover:border-slate-300 hover:bg-white/10 transition-all text-[11px] tracking-[0.6em] uppercase font-bold text-center">
              ACCESS GRANTED
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticating) {
    return (
      <div className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[#4f5863] font-mono text-center">
        <span className="text-slate-300 text-[11px] tracking-[1em] mb-8 animate-pulse uppercase font-bold">Establishing Secure Node...</span>
        <div className="w-72 h-[1px] bg-slate-900 relative overflow-hidden mx-auto">
          <div className="absolute inset-0 bg-slate-300 animate-loading-bar" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#a8afb7] text-[#111827] font-mono selection:bg-slate-400 selection:text-slate-950">
      <main className="container mx-auto px-6 py-20 max-w-4xl flex flex-col items-center">
        <div className="w-full mb-20 text-center border-b border-[#7b838c] pb-10">
          <Header />
        </div>

        {!activeTab ? (
          <nav className="w-full max-w-md flex flex-col gap-4">
            {['PROFILE', 'LOG', 'REPORT', 'DEUNIVERSE', 'BOOK', 'DATA', 'ETC.'].map((label) => (
              <button
                key={label}
                onClick={() => { 
                  setIsLoadingTab(true); 
                  setTimeout(() => { 
                    setActiveTab(label.toLowerCase()); 
                    setIsLoadingTab(false); 
                  }, 700); 
                }}
                className="py-4 px-10 border border-[#4f5863] bg-[#9ea7b1]/28 text-[#101827] hover:bg-[#b7bec6]/55 hover:border-[#41474e] hover:text-black hover:shadow-[0_0_24px_rgba(0,0,0,0.10)] transition-all duration-300 text-left text-[16px] tracking-[0.5em] font-extrabold group"
              >
                <div className="group-hover:translate-x-2 transition-transform duration-300">
                  <span className="block">
                    {label}
                  </span>

                 <span className="block mt-1 text-[9px] tracking-[0.25em] text-slate-600 font-normal">
                    {label === 'PROFILE' && 'SUBJECT IDENTITY FILE'}
                    {label === 'LOG' && 'INTERNAL MEMORY RECORDS'}
                    {label === 'REPORT' && 'CLASSIFIED OBSERVATION'}
                    {label === 'DEUNIVERSE' && 'PRIVATE ARCHIVE NODE'}
                    {label === 'BOOK' && 'TEXTUAL REFERENCES'}
                    {label === 'DATA' && 'RAW DATA STORAGE'}
                    {label === 'ETC.' && 'UNSORTED MATERIALS'}
                 </span>
                </div>
              </button>
            ))}
            <button
              onClick={handleExternalLink}
              className="mt-8 py-5 px-10 border border-[#4f5863] bg-[#9ea7b1]/28 text-[#101827] hover:bg-[#b7bec6]/55 hover:border-[#41474e] hover:text-black hover:shadow-[0_0_24px_rgba(0,0,0,0.10)] transition-all duration-300 text-left text-[16px] tracking-[0.5em] font-extrabold"
            >
              EXTERNAL MEMORY
            </button>
          </nav>
        ) : (
          <div className="w-full animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <button 
              onClick={() => {
                setActiveTab(null);
                window.history.pushState({}, '', '/');
              }}
              className="mb-16 text-[12px] text-slate-700 hover:text-slate-950 tracking-[0.6em] uppercase transition-colors font-bold flex items-center"
            >
              [ ← RETURN_TO_TERMINAL ]
            </button>
            
            <div className="relative min-h-[400px]">
              {isLoadingTab ? (
                <div className="flex justify-center py-32 animate-pulse">
                  <div className="h-[1px] w-40 bg-slate-700 animate-loading-bar" />
                </div>
              ) : (
                <>
                  {activeTab === 'profile' && <ProfileLogs />}
                  {activeTab === 'log' && <InternalLogs />}
                  {activeTab === 'deuniverse' && <DeuniverseLogs />}
                  {activeTab === 'report' && <ReportLogs />}
                  {!['profile', 'log', 'deuniverse','report'].includes(activeTab) && (
                    <div className="text-center py-40 border border-slate-900/30 text-slate-600 tracking-[0.8em] text-[12px] uppercase font-bold">
                      [ {activeTab}_DATA_STREAM_OFFLINE ]
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        <footer className="mt-48 py-12 text-center">
          <p className="text-[11px] tracking-[0.4em] uppercase text-slate-500 font-bold opacity-40">
            © 2024 TAEHON STRATEGY GROUP. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </main>
      
      <style jsx global>{`
        @keyframes loading-bar { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-loading-bar { animation: loading-bar 1.5s infinite linear; }
      `}</style>
    </div>
  );
}

// 잊지 말고 Home 함수와 Suspense를 꼭 포함시켜야 합니다.
export default function Home() {
  return (
    <Suspense fallback={<div className="bg-[#a8afb7] min-h-screen" />}>
      <TerminalContent />
    </Suspense>
  );
}