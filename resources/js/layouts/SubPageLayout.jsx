import React, { useEffect, useState } from 'react'
import Header from '../components/app/Header'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import Button from '../components/ui/Button'
import SubPageHeader from '../components/app/SubPageHeader'
import { Head, usePage } from '@inertiajs/react'
import FlashMessage from '../components/app/FlashMessage'

function SubPageLayout({ children, title }) {
  const { flash } = usePage();
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if(flash.toast) {
      setToast(true);
    }
    const timer = setTimeout(() => {
      setToast(false);
    }, 5000);

    return clearTimeout(timer);
  }, [flash.toast])
  return (
    <div className='overflow-hidden h-screen flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50'>
      <Head title={title}/>
      <SubPageHeader title={title} />
      {toast && flash.toast && (
        <FlashMessage message={flash.toast.message} onClose={() => setToast(false)} />
      )}
      <main className='flex-1 overflow-hidden overflow-y-auto pt-16 md:pt-18'>
        {children}
      </main>
    </div>
  )
}

export default SubPageLayout
