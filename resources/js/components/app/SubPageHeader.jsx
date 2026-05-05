import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';
// import { ArrowLeftCircleIcon } from '../icons/Index'; // သို့မဟုတ် ပိုရိုးရှင်းတဲ့ Arrow icons

function SubPageHeader({ title, className }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`
        ${className} fixed top-0 left-0 right-0 z-40 transition-all duration-300
        bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl
        border-b border-zinc-200 dark:border-zinc-800
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
    >
      <div className="max-w-7xl mx-auto h-16 md:h-18 flex items-center px-4 md:px-8">

        {/* Back Button - Hover effect နဲ့ ပိုရှင်းအောင်လုပ်ထားတယ် */}
        <div className="flex-none">
          <button
            onClick={() => history.back()}
            className="group flex items-center justify-center p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors active:scale-90"
            aria-label="Go back"
          >
            <ArrowLeftCircleIcon className="size-7 md:size-8 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
          </button>
        </div>

        {/* Title - Truncate ပါဝင်လို့ စာရှည်ရင် design မပျက်ဘူး */}
        <div className="flex-1 px-4">
          <h2 className="text-lg font-nunito lg:text-xl font-bold text-center text-zinc-900 dark:text-zinc-100 line-clamp-1 tracking-tight">
            {title}
          </h2>
        </div>

        {/* Spacer - Title ကို အလယ်တည့်တည့်ရောက်အောင် ညာဘက်မှာ နေရာလွတ်ပြန်ချန်တာ */}
        <div className="flex-none w-11 md:w-12"></div>
      </div>
    </header>
  );
}

export default SubPageHeader;