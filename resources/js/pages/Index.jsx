import React from 'react'
import BlogCard from '../components/blog/BlogCard'
import { InfiniteScroll, Link, setLayoutProps, usePage } from '@inertiajs/react'
import { Pagination } from '../components/app/Pagination';

function Index({ blogs }) {
  setLayoutProps({
    title: "Home"
  })
  const { auth } = usePage().props;
  return (
    <div className="max-w-xl mx-auto px-2 py-5">
      <div className="w-full mx-auto mb-2">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center gap-4">

          {/* User Avatar */}
          <div className="shrink-0">
            <div className="size-10 rounded-full border-2 border-white dark:border-zinc-800 ring-1 ring-zinc-200 dark:ring-zinc-700 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <img
                src={auth.user?.visible_profile_image}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Fake Input Link */}
          <Link
            href="/create"
            className="flex-1 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 dark:text-zinc-500 py-2.5 px-5 rounded-full text-sm font-medium transition-[color] overflow-hidden text-left"
          >
            <span className='line-clamp-1'>
              Share your thoughts, {auth.user?.name.split(' ')[0]}...
            </span>
          </Link>

          {/* Action Link Button */}
          <Link
            href="/create"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold text-sm transition-all transform active:scale-95 shadow-md hover:brightness-110"
            style={{ backgroundColor: '#509baf' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="size-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="hidden sm:inline">Create</span>
          </Link>

        </div>
        <div className='flex items-center gap-2 mt-2 justify-center'>
          <span className='block size-2 bg-zinc-500/50 rounded-full'></span>
          <span className='block size-2 bg-zinc-500/50 rounded-full'></span>
        </div>
      </div>
      <InfiniteScroll data='blogs' buffer={500} preserveUrl className='space-y-2'>
        {blogs.data.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default Index
