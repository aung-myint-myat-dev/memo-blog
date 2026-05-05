import { ClockIcon, MessageIcon, PersonIcon } from '../../components/icons/Index'
import Comment from '../../components/blog/Comment'
import CommentForm from '../../components/blog/CommentForm'
import { useState, useRef } from 'react'
import { setLayoutProps } from '@inertiajs/react'

function Show({ blog }) {
  setLayoutProps({
    title: "Blog Detail"
  })
  const [editingComment, setEditingComment] = useState(null);
  const commentListRef = useRef(null);

  const handleEdit = (comment) => setEditingComment(comment);
  const handleCancelEdit = () => setEditingComment(null);

  const handleSuccess = () => {
    if (commentListRef.current) {
      setTimeout(() => {
        commentListRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  const brandColor = "#509baf";

  return (
    <div className='relative flex flex-col pb-14 min-h-full selection:bg-[#509baf]/20 font-nunito'>

      {/* Main Content Area */}
      <div className='w-full max-w-3xl mx-auto px-5 py-12 space-y-8'>

        {/* Header Section */}
        <header className='space-y-4'>
          <div className='flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-400'>
            <span style={{ color: brandColor }}>{blog.category.name}</span>
            <span className='size-1 rounded-full bg-zinc-300 dark:bg-zinc-700'></span>
            <span>{blog.readable_created_at}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 leading-tight">
            {blog.title}
          </h1>

          <div className='flex items-center gap-3 pt-2'>
            <div className='size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 shadow-sm'>
              <PersonIcon className="size-4 text-zinc-400" />
            </div>
            <span className='text-sm font-bold text-zinc-700 dark:text-zinc-300'>{blog.user.name}</span>
          </div>
        </header>

        {/* Blog Image: ပုံရှိမှသာ ပြမယ်၊ မရှိရင် ဒီ Section တစ်ခုလုံး ပျောက်နေမှာပါ */}
        {blog.cover_image && (
          <div className='rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900'>
            <img
              src={blog.visible_cover_image}
              className='w-full object-cover max-h-[450px]'
              alt={blog.title}
            />
          </div>
        )}

        {/* Article Body */}
        <div className='space-y-6'>
          {/* Description Box */}
          <div
            style={{ borderLeftColor: brandColor }}
            className='border-l-4 pl-5 py-1'
          >
            <p className="text-lg font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
              {blog.description}
            </p>
          </div>

          {/* Actual Content */}
          <article className='text-zinc-800 dark:text-zinc-300 text-[17px] md:text-lg leading-[1.8] whitespace-pre-line font-medium'>
            {blog.content}
          </article>
        </div>

        <hr className='border-zinc-100 dark:border-zinc-800' />

        {/* Discussion Section */}
        <div className='space-y-6'>
          <h3 className='text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2'>
            Discussion
            <span className='text-sm font-medium text-zinc-400'>({blog.comments.length})</span>
          </h3>

          {blog.comments.length > 0 ? (
            <div ref={commentListRef} className='space-y-5 scroll-mt-24'>
              {blog.comments.map(comment => (
                <Comment key={comment.id} comment={comment} onEdit={handleEdit} />
              ))}
              {/* Scroll Target */}
            </div>
          ) : (
            <div className='py-12 text-center rounded-3xl border-2 border-dashed border-zinc-100 dark:border-zinc-800'>
              <p className='text-zinc-400 text-sm font-bold'>No comments yet. Start the conversation below!</p>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Form Wrapper */}
      <div className='fixed bottom-2 left-0 right-0 z-50 py-2 mx-2'>
        <div className='max-w-3xl mx-auto'>
          <CommentForm
            blogId={blog.id}
            comment={editingComment}
            onCancel={handleCancelEdit}
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </div>
  )
}

export default Show