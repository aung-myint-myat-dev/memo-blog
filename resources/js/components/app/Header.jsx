// import React, { useState, useEffect } from 'react'
// import { HomeIcon, MoonIcon, PlusIcon, SunIcon } from '../icons/Index';
// import { Link, usePage } from '@inertiajs/react';
// import { useTheme } from '../../context/ThemeContext';
// import Button from '../ui/Button';

// const links = [
//   // { name: "Home", href: "/home", icon: <HomeIcon className="size-5" /> },
//   { name: "Create", href: "/create", icon: <PlusIcon className="size-5" /> },
// ];

// function Header({ className }) {
//   const { url } = usePage();
//   const { auth } = usePage().props;
//   const { darkMode, toggleTheme } = useTheme();

//   // Scroll State logic
//   const [isVisible, setIsVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   useEffect(() => {
//     const controlNavbar = () => {
//       if (typeof window !== 'undefined') {
//         if (window.scrollY > lastScrollY && window.scrollY > 100) {
//           // အောက်ကို scroll ဆွဲရင် ဖျောက်မယ်
//           setIsVisible(false);
//         } else {
//           // အပေါ်ကို scroll ဆွဲရင် ပြန်ဖော်မယ်
//           setIsVisible(true);
//         }
//         setLastScrollY(window.scrollY);
//       }
//     };

//     window.addEventListener('scroll', controlNavbar);
//     return () => window.removeEventListener('scroll', controlNavbar);
//   }, [lastScrollY]);

//   return (
//     <header
//       className={`
//         ${className} fixed top-0 left-0 right-0 z-40 transition-transform duration-300 h-16 md:h-20
//         flex items-center justify-between px-6 md:px-12
//         bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl
//         border-b border-zinc-200 dark:border-zinc-800
//         ${isVisible ? 'translate-y-0' : '-translate-y-full'}
//       `}
//     >
//       {/* Logo */}
//       <div className="flex-shrink-0">
//         <Link href="/" className="group flex items-center gap-2">
//           <div className="size-8 bg-zinc-900 dark:bg-zinc-100 rounded-lg flex items-center justify-center">
//             <span className="text-white dark:text-zinc-900 font-bold text-xl">M</span>
//           </div>
//           <span className="text-xl md:text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
//             Memo
//           </span>
//         </Link>
//       </div>

//       {/* Center Navigation - Desktop Only */}
//       <nav className="hidden lg:flex items-center bg-zinc-100/50 dark:bg-zinc-900/50 p-1 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 text-end">
//         {links.map(link => {
//           const isActive = url === link.href;
//           return (
//             <Link key={link.name} href={link.href}>
//               <div className={`
//                 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all
//                 ${isActive
//                   ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
//                   : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}
//               `}>
//                 {link.icon}
//                 {link.name}
//               </div>
//             </Link>
//           )
//         })}
//       </nav>

//       {/* Right Side Actions */}
//       <div className="flex items-center gap-2 md:gap-4">
//         {/* Theme Toggle */}
//         <button
//           onClick={toggleTheme}
//           className="p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors active:scale-95"
//         >
//           {darkMode ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
//         </button>

//         {/* Vertical Divider */}
//         <div className="hidden md:block w-[1px] h-6 bg-zinc-200 dark:bg-zinc-800 mx-1" />

//         {/* Profile Section */}
//         {auth.user && (
//           <Link
//             href="/profile"
//             className={`
//               flex items-center gap-2 p-1 pr-3 rounded-full border transition-all
//               ${url === '/profile'
//                 ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700'
//                 : 'border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900'}
//             `}
//           >
//             <div className="size-8 md:size-9 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 ring-2 ring-offset-2 ring-transparent dark:ring-offset-zinc-950 group-hover:ring-zinc-200">
//               <img
//                 src={auth.user?.visible_profile_image}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <span className="hidden md:block text-sm font-bold text-zinc-700 dark:text-zinc-300">
//               {auth.user.name.split(' ')[0]}
//             </span>
//           </Link>
//         )}
//       </div>
//     </header>
//   )
// }

// export default Header

import React, { useState, useEffect } from 'react'
import { HomeIcon, MoonIcon, PlusIcon, SunIcon } from '../icons/Index';
import { Link, usePage } from '@inertiajs/react';
import { useTheme } from '../../context/ThemeContext';

const links = [
  { name: "Home", href: "/home", icon: <HomeIcon className="size-5" /> },
  { name: "Create", href: "/create", icon: <PlusIcon className="size-5" /> },
];

function Header({ className }) {
  const { url } = usePage();
  const { auth } = usePage().props;
  const { darkMode, toggleTheme } = useTheme();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // Brand Color Variable
  const brandColor = "#509baf";

  return (
    <header
      className={`
        ${className} fixed top-0 left-0 right-0 z-40 h-16 md:h-20
        flex items-center justify-between px-6 md:px-12
        transition-transform duration-300
        bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl
        border-b border-zinc-200 dark:border-zinc-800
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      {/* Logo Section */}
      <div className="shrink-0">
        <Link href="/" className="flex items-center gap-2 group">
          <div
            style={{ backgroundColor: brandColor }}
            className="size-9 rounded-xl flex items-center justify-center shadow-lg shadow-[#509baf]/20 group-hover:rotate-12 transition-transform"
          >
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            Memo<span style={{ color: brandColor }}> .</span>
          </span>
        </Link>
      </div>

      {/* Navigation - Desktop */}
      <nav className="hidden lg:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        {links.map(link => {
          const isActive = url === link.href;
          return (
            <Link key={link.name} href={link.href}>
              <div
                className={`
                  flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-[color] duration-300 transi
                  ${isActive
                    ? 'bg-white dark:bg-zinc-800 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}
                `}
                style={isActive ? { color: brandColor } : {}}
              >
                {/* Icon color လည်း active ဖြစ်ရင် brand color ပြောင်းမယ် */}
                <span style={isActive ? { color: brandColor } : {}}>{link.icon}</span>
                {link.name}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle with Brand Glow */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-all active:scale-90"
          style={darkMode ? {} : { color: darkMode ? '#facc15' : brandColor }}
        >
          {darkMode ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
        </button>

        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1 hidden md:block" />

        {/* Profile with Brand Border */}
        {auth.user && (
          <Link
            href="/profile"
            className="hidden md:flex items-center gap-2 group"
          >
            <div
              className="size-9 md:size-10 rounded-full overflow-hidden border-2 transition-transform group-hover:scale-105"
              style={{ borderColor: url === '/profile' ? brandColor : 'transparent' }}
            >
              <img
                src={auth.user?.visible_profile_image}
                className="w-full h-full object-cover bg-zinc-100"
              />
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-none mb-1">
                {auth.user.name}
              </span>
            </div>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header