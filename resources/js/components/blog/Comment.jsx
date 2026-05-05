import { Link, usePage } from '@inertiajs/react'
import React, { useState, useEffect, useRef } from 'react'
import { DeleteIcon, EditIcon, MenuDotsIcon } from '../icons/Index';

function Comment({ className, comment, onEdit }) {
  const { auth } = usePage().props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const brandColor = "#509baf";

  // Menu အပြင်ဘက်ကို နှိပ်ရင် Menu ပိတ်သွားဖို့
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`${className} w-full`}>
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 shadow-sm transition-colors max-w-sm">

        <div className="flex items-start gap-3">
          {/* Avatar Area */}
          <div className='shrink-0'>
            <div className='size-10 rounded-full border-2 border-white dark:border-zinc-800 ring-1 ring-zinc-200 dark:ring-zinc-700 overflow-hidden bg-zinc-100 dark:bg-zinc-800'>
              <img
                src={comment.user.visible_profile_image}
                className='w-full h-full object-cover'
                alt={comment.user.name}
              />
            </div>
          </div>

          {/* Content Area */}
          <div className='flex-1 min-w-0'>
            <div className='flex justify-between items-start'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:gap-2'>
                <h2 className='text-zinc-900 dark:text-zinc-100 font-bold text-sm truncate'>
                  {comment.user.name}
                </h2>
                <span className='hidden sm:block size-1 rounded-full bg-zinc-300 dark:bg-zinc-700'></span>
                <span className='text-[10px] font-bold text-zinc-400 uppercase tracking-tight'>
                  {comment.readable_created_at}
                </span>
              </div>

              {/* Pure Tailwind Custom Dropdown */}
              {auth.user?.id === comment.user_id && (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-90"
                  >
                    <MenuDotsIcon className="size-4" />
                  </button>

                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-xl shadow-xl z-[100] py-1 animate-in fade-in zoom-in duration-150 origin-top-right">
                      <button
                        onClick={() => { onEdit(comment); setIsMenuOpen(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors"
                      >
                        <EditIcon className="size-4" style={{ color: brandColor }} />
                        Edit
                      </button>
                      <Link
                        preserveScroll
                        href={`/comment/${comment.id}`}
                        method='delete'
                        as="button"
                        onBefore={() => confirm('Are you sure want to delete?')}
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                      >
                        <DeleteIcon className="size-4" />
                        Delete
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Comment Text */}
            <div className='mt-2 pr-2'>
              <p className='text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap font-medium'>
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment
