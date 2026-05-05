import { Link, router, usePage } from '@inertiajs/react'
import { DeleteIcon, EditIcon, MenuDotsIcon, PersonIcon } from '../icons/Index'
import { useState, useEffect, useRef } from 'react';
import ConfirmModal from '../app/ConfirmModal';

function BlogCard({ className, blog }) {
  const { auth } = usePage().props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deleteBlogConfirmModal, setDeleteBlogConfirmModal] = useState(false);
  const menuRef = useRef();

  // Brand Color
  const brandColor = "#509baf";

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsMenuOpen(false);
    };
    document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, []);

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const noOfWords = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    if (noOfWords === 0) return "00:00";
    const totalSeconds = Math.floor((noOfWords / wordsPerMinute) * 60);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');
    return `${mm}:${ss}`;
  }

  const handleDeleteBlog = (blog) => {
    return router.delete(`/${blog.slug}`);
  }

  return (
    <>
      <div
        className={`${className} group relative flex flex-col h-max bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg md:rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-none`}
      >
        {/* Action Menu (User Ownership) */}
        {auth.user.id === blog.user.id && (
          <div className="absolute top-3 right-3 z-30" ref={menuRef}>
            <button
              onClick={(e) => { e.preventDefault(); setIsMenuOpen(!isMenuOpen); }}
              className="p-1.5 rounded-lg bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-[color]"
            >
              <MenuDotsIcon className="size-5" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl py-1 overflow-hidden animate-in fade-in zoom-in duration-150">
                <Link href={`/blog/edit/${blog.slug}`} className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors">
                  <EditIcon className="size-4" style={{ color: brandColor }} /> Edit
                </Link>
                <button
                  onClick={() => setDeleteBlogConfirmModal(true)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                  <DeleteIcon className="size-4" /> Delete
                </button>
              </div>
            )}
          </div>
        )}

        {blog.cover_image && (
          <div className="relative aspect-video overflow-hidden border-b border-zinc-100 dark:border-zinc-800">
            <img
              src={blog.visible_cover_image}
              alt=""
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        {/* Blog Content Body */}
        <div className="flex flex-col p-5 md:p-6">
          <div className="flex-1 space-y-3">
            {/* Metadata Section */}
            <div className="flex sm:items-center gap-2 mb-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              <div className='flex flex-col sm:flex-row sm:items-center gap-1'>
                <span style={{ color: brandColor }}>{blog.category.name}</span>
                <span className="hidden sm:block size-1 rounded-full bg-zinc-200 dark:bg-zinc-700"></span>
                <span>{blog.readable_created_at}</span>
              </div>
              <span style={{ color: '#af6450' }}>ERT - {calculateReadingTime(blog.content)}</span>
            </div>

            {/* Title */}
            <h2 className="text-lg font-sans font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-[color]">
              {blog.title}
            </h2>

            {/* Description */}
            <p className="text-sm font-sans text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-6 leading-loose">
              {blog.description}
            </p>
          </div>

          {/* Card Footer */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <PersonIcon className="size-4 text-zinc-400" />
              </div>
              <Link href={auth.user.id === blog.user.id ? '/profile' : `/profile/${blog.user.name}`} className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {blog.user.name}
              </Link>
              {/* <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              {blog.user.name}
            </span> */}
            </div>

            <Link
              href={`/blog/${blog.slug}`}
              className="group/btn inline-flex items-center gap-2 text-sm font-bold text-[#509baf] transition-[color] duration-200 hover:text-[#61bad2] hover:gap-3"         >
              See more
            </Link>
          </div>
        </div>
      </div>
      {deleteBlogConfirmModal && (
        <ConfirmModal 
        show={deleteBlogConfirmModal} 
        onClose={() => setDeleteBlogConfirmModal(false)}
        title='Are you sure want to delete this blog?'
        onConfirm={() => handleDeleteBlog(blog)}/>
      )}
    </>
  )
}

export default BlogCard