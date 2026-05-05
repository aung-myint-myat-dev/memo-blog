import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const GuestHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { url } = usePage();

  const brandColor = "#509baf";
  const links = [
    {name: "About", href: "/"},
    {name: "Contact", href: "/contact"},
  ]

  const onCloseMenu = () => {
    setIsMenuOpen(false);
  }
  return (
    <nav className="bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
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

          {/* Menu Links */}
          <div className="hidden flex-1 justify-center md:flex items-center gap-8">
            {links.map(link => {
              const isActive = url === link.href;

              return (
                <Link key={link.name} href={link.href} className={`text-sm font-bold ${isActive ? 'text-[#509baf]' : 'text-zinc-500 hover:text-[#509baf]'} transition-colors`}>
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href='/login'
              className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 px-4 py-2"
            >
              Log in
            </Link>
            <Link
              href='/register'
              className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-bold px-6 py-2.5 rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-zinc-900/10 dark:shadow-white/5"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
            >
              {isMenuOpen ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {links.map(link => (
              <Link as="button" onClick={onCloseMenu} key={link.name} href={link.href} className="block px-4 py-3 text-base font-bold text-zinc-600 dark:text-zinc-400 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900">{link.name}</Link>
            ))}
            {/* <Link href="/about" className="block px-4 py-3 text-base font-bold text-zinc-600 dark:text-zinc-400 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900">About</Link> */}
            <hr className="border-zinc-100 dark:border-zinc-900 my-2" />
            <Link href="/login" className="block px-4 py-3 text-base font-bold text-zinc-600 dark:text-zinc-400">Log in</Link>
            <Link href="/register" className="block px-4 py-4 text-center bg-[#509baf] text-white font-bold rounded-2xl">Register</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default GuestHeader;