// import { Link } from '@inertiajs/react';
// import { PersonIcon } from '../icons/Index';

// function MobileDock({ links, url }) {
//   return (
//     /* Container: Screen ရဲ့ အောက်ခြေမှာ ကပ်နေဖို့ position fixed သုံးထားပါတယ် */
//     <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 lg:hidden">

//       {/* Dock Wrapper: Glassmorphism effect (blur) ပါဝင်ပါတယ် */}
//       <nav className="flex items-center gap-1 p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl shadow-2xl shadow-zinc-200/50 dark:shadow-none transition-all duration-300">

//         {links.map((link) => {
//           const isActive = url === link.href;

//           return (
//             <Link href={link.href} key={link.name} className="relative group">
//               <button
//                 className={`
//                   relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300
//                   ${isActive
//                     ? 'text-zinc-900 dark:text-white scale-110'
//                     : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
//                   }
//                 `}
//               >
//                 {/* Icon Container */}
//                 <span className="relative z-10 size-6 flex items-center justify-center font-bold">
//                   {link.icon}
//                 </span>

//                 {/* Active Indicator Dot: Active ဖြစ်ရင် အောက်မှာ အစက်လေး ပေါ်နေမယ် */}
//                 {isActive && (
//                   <span className="absolute -bottom-0.5 w-1 h-1 bg-zinc-900 dark:bg-zinc-100 rounded-full animate-pulse" />
//                 )}

//                 {/* Background Highlight on Active */}
//                 {isActive && (
//                   <span className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-xl -z-0 animate-in fade-in zoom-in duration-200" />
//                 )}
//               </button>
//             </Link>
//           );
//         })}

//         {/* Profile Link (Separator လေး တစ်ခု ခြားပေးထားတယ်) */}
//         <div className="w-[1px] h-6 bg-zinc-200 dark:bg-zinc-800 mx-1" />

//         <Link href="/profile" className="relative group">
//           <button
//             className={`
//               p-3 rounded-xl transition-all duration-300
//               ${url === '/profile'
//                 ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
//                 : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
//               }
//             `}
//           >
//             <PersonIcon className="size-6" />
//           </button>
//         </Link>
//       </nav>
//     </div>
//   );
// }

// export default MobileDock;

import { Link } from '@inertiajs/react';
import { PersonIcon } from '../icons/Index';
import { useState, useEffect } from 'react';

function MobileDock({ links, url }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlDock = () => {
      if (typeof window !== 'undefined') {
        // Scroll 50px ထက်ကျော်မှ စပြီး အလုပ်လုပ်မယ်
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
          // အောက်ကို ဆွဲနေရင် ဖွက်ထားမယ်
          setIsVisible(false);
        } else {
          // အပေါ်ကို ဆွဲရင် ပြန်ဖော်မယ်
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlDock);
    return () => window.removeEventListener('scroll', controlDock);
  }, [lastScrollY]);

  return (
    <div
      className={`
        fixed bottom-6 left-0 right-0 z-50 flex justify-center px-6 lg:hidden
        transition-all duration-500 ease-in-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}
      `}
    >
      <nav className="flex items-center gap-1 p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-none">

        {links.map((link) => {
          const isActive = url === link.href;

          return (
            <Link href={link.href} key={link.name} className="relative group">
              <div
                className={`
                  relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300
                  ${isActive
                    ? 'text-zinc-900 dark:text-white'
                    : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
                  }
                `}
              >
                <span className="relative z-10 size-6 flex items-center justify-center">
                  {link.icon}
                </span>

                {/* Active Indicator Background */}
                {isActive && (
                  <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-xl -z-0 animate-in fade-in zoom-in" />
                )}

                {/* Active Dot */}
                {isActive && (
                  <div className="absolute -bottom-1 size-1 bg-zinc-900 dark:bg-zinc-100 rounded-full" />
                )}
              </div>
            </Link>
          );
        })}

        <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-800 mx-1" />

        <Link href="/profile">
          <div
            className={`
              p-3 rounded-xl transition-all duration-300
              ${url === '/profile'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
              }
            `}
          >
            <PersonIcon className="size-6" />
          </div>
        </Link>
      </nav>
    </div>
  );
}

export default MobileDock;