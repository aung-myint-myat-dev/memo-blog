import { Head, Link } from '@inertiajs/react'
import { ArrowLeftIcon, BrushIcon, HomeIcon, PersonIcon, PlusIcon, } from '../components/icons/Index';
import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/ui/Button';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import Header from '../components/app/Header';
import MobileDock from '../components/app/MobileDock';
import FlashMessage from '../components/app/FlashMessage';

const links = [
  {
    name: "Home",
    href: "/home",
    icon: <HomeIcon />,
  },
  {
    name: "Create",
    href: "/create",
    icon: <PlusIcon />
  },
];

function AppLayout({ children, title }) {
  const { url, flash } = usePage();
  const { auth } = usePage().props;
  const [toast, setToast] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    if (flash.toast) {
      setToast(true);
    }

    const timer = setTimeout(() => {
      setToast(false);
    }, 5000)

    return () => clearTimeout(timer);
  }, [flash.toast]);

  return (
    <div className='relative text-base-content font-nunito'>
      <Head title={title} />
      <Header className="fixed top-0 left-0 w-full z-55 bg-zinc-50 dark:bg-zinc-950" />
      {toast && flash.toast && (
        <FlashMessage message={flash.toast.message} />
      )}

      <main className='min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-16 md:pt-20'>
        {children}
      </main>
      <MobileDock links={links} url={url} />
    </div>
  )
}

export default AppLayout
