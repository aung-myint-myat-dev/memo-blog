import { Link } from "@inertiajs/react";

export const Pagination = ({ links }) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-10 mb-20">
      {links.map((link, index) => {
        // အရှေ့ဆုံး (Prev) နဲ့ အနောက်ဆုံး (Next) ခလုတ်တွေကို icon လေးတွေနဲ့ လှအောင်လုပ်မယ်
        const isPrev = index === 0;
        const isNext = index === links.length - 1;

        return (
          link.url ? (
            <Link
              key={index}
              href={link.url}
              preserveScroll
              disabled={!link.url}
              className={`
              min-w-[40px] h-10 flex items-center justify-center px-3 rounded-xl border text-sm font-bold transition-all duration-200
              ${link.active
                  ? 'bg-[#509baf] text-white border-[#509baf] shadow-lg shadow-[#509baf]/20'
                  : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-100 dark:border-zinc-800 hover:border-[#509baf] hover:text-[#509baf]'
                }
              ${!link.url ? 'opacity-40 cursor-not-allowed border-dashed' : ''}
            `}
            >
              {/* Label ထဲက HTML entity တွေကို စာသားပြောင်းပေးတာ */}
              <span dangerouslySetInnerHTML={{
                __html: isPrev ? 'Prev' : isNext ? 'Next' : link.label
              }} />
            </Link>
          ) : (
            <span
              key={index}
              className="px-4 py-2 text-zinc-400 opacity-50 cursor-not-allowed border border-zinc-200 rounded-xl"
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          )
        );
      })}
    </div>
  );
};