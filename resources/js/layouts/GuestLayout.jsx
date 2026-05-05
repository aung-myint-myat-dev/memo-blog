import { Head, Link } from '@inertiajs/react'
import { BrushIcon, HomeIcon, MoonIcon, PersonIcon, PlusIcon, SunIcon } from '../components/icons/Index';
import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import GuestHeader from '../components/app/GuestHeader';

const links = [
  {
    name: "Login",
    href: "/login",
  },
  {
    name: "Register",
    href: "/register",
  },
];

function GuestLayout({ children, title = "Lareactia" }) {
  const { url } = usePage();
  const [darkMode, setDarkMode] = useState();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    savedTheme === 'forest' ? setDarkMode(true) : setDarkMode(false);
  }, [])

  useEffect(() => {
    const theme = darkMode ? 'forest' : 'cupcake';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [darkMode])

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className='text-base-content font-nunito  min-h-screen flex flex-col'>
      <GuestHeader/>
      <main className='flex-1 flex items-center justify-center'>
        {children}
      </main>
    </div>
  )
}

export default GuestLayout
