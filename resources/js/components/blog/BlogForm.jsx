import { Form, setLayoutProps, useForm, usePage } from '@inertiajs/react'
import { ImageIcon } from '../../components/icons/Index';
import FormError from './FormError';
import Button from '../ui/Button';
import { ArrowDownCircleIcon, ArrowPathIcon, ChevronDoubleDownIcon, ClockIcon, PaintBrushIcon, PhotoIcon, QuestionMarkCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { ArrowDownIcon } from '@heroicons/react/24/outline';

function BlogForm({ categories, blog }) {

  const { auth } = usePage().props;
  const [previewImage, setPreviewImage] = useState(null);

  const { data, setData, post, delete: destroy, put, progress, processing, errors, reset, cancel } = useForm({
    category_id: blog?.category_id ?? 1,
    title: blog?.title ?? '',
    description: blog?.description ?? '',
    content: blog?.content ?? '',
    cover_image: null,
  })

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }

    setData('cover_image', file);
  }

  const handleRemoveImageUpload = () => {
    if (previewImage) {
      setData('cover_image', null);
      setPreviewImage(null);
    }
  }

  const handleRemoveBlogImage = () => {
    if (blog && blog.visible_cover_image) {
      destroy(`/blog/${blog.slug}/cover-image`, {
        preserveScroll: true,
        onSuccess: () => {
          setData('cover_image', null);
          setPreviewImage(null);
        }
      })
    }
  }

  function submit(e) {
    e.preventDefault();
    if (blog) {
      put(`/blog/${blog.slug}`, {
        onSuccess: () => reset(),
      });
    } else {
      post('/create', {
        onSuccess: () => reset(),
      });
    }
  }

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

  return (
    <div className='w-full min-h-full font-nunito'>
      <div className='flex flex-col w-full min-h-full px-4 lg:px-12'>

        <form onSubmit={(e) => e.preventDefault()}
          className='flex-1 flex flex-col gap-3'>

          {/* User Profile, Category Select, Submit Button */}
          <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-3 py-5 '>
            <div className='flex items-center gap-3'>
              <img src={auth.user.visible_profile_image} alt={auth.user.name} className='size-10 rounded-full' />
              <h2 className='text-lg text-zinc-900 dark:text-zinc-100 font-bold'>{auth.user.name}</h2>
            </div>

            <div className='flex items-center justify-between gap-5 text-sm mt-3 lg:mt-0'>
              <div className='relative flex items-center gap-2 '>
                <select
                  name='category_id'
                  onChange={(e) => setData('category_id', e.target.value)}
                  className="focus:outline-none rounded-md">
                  <option value={1} className='dark:bg-zinc-950 py-2 px-3'>Technology</option>
                  {categories.slice(1).map(category => (
                    <option
                      key={category.id}
                      value={category.id}
                      className='dark:bg-zinc-950 py-2 px-3'>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <span className='absolute -bottom-6 left-0 text-xs text-red-500 w-max'>{errors.category_id}</span>
                )}
              </div>

              <div>
                {!processing ? (
                  <Button variant='brand' type="submit" onClick={submit} className='h-8 w-max px-4 text-sm flex items-center justify-center'>{
                    blog ? 'Update' : 'Publish'
                  }</Button>
                ) : (
                  <Button type="button" onClick={cancel} className='h-8 w-max px-4 text-sm flex items-center justify-center' variant='danger' icon={<ArrowPathIcon className='size-4 animate-spin' />}>Cancle</Button>
                )}
              </div>
            </div>
          </div>

          <div className='flex-1 pb-6 flex flex-col gap-3'>
            {/* Title Input */}
            <div className='relative'>
              <input
                type="text"
                name='title'
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                placeholder="Blog title"
                className="w-full p-3 bg-transparent text-2xl font-semibold focus:outline-none"
              />
              {errors.title && (
                <span className='absolute -bottom-6 left-0 text-xs text-red-500 p-3'>{errors.title}</span>
              )}
            </div>

            {/* Description Input */}
            <div className='relative'>
              <input
                type="text"
                name='description'
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                placeholder="Blog Description"
                className="w-full p-3 bg-transparent text-lg font-semibold focus:outline-none"
              />
              {errors.description && (
                <span className='absolute -bottom-6 left-0 text-xs text-red-500 p-3'>{errors.description}</span>
              )}
            </div>

            {/* Textarea Input For Content */}
            <div className='flex-1 min-h-30 relative flex flex-col'>
              <textarea
                name='content'
                value={data.content}
                onChange={(e) => setData('content', e.target.value)}
                className="flex-1 p-3 w-full bg-transparent text-base font-semibold focus:outline-none" placeholder='Write more about it.'>
              </textarea>
              {errors.content && (
                <span className='absolute -bottom-6 left-0 text-xs text-red-500 p-3'>{errors.content}</span>
              )}
            </div>

            {/* Footer Image Upload and Reading Time */}
            <div className='p-3 flex lg:justify-between flex-col lg:flex-row justify-center items-start gap-6'>
              <label htmlFor='cover_image' className='relative flex items-center gap-2'>
                <PhotoIcon className='size-7' />
                <span className='text-xs font-sans'>Max 2MB</span>
                <input
                  name='cover_image'
                  id='cover_image'
                  onChange={handleImageUpload}
                  type="file"
                  accept=".jpg, .jpeg, .png, .pdf"
                  className='hidden' />
                {errors.cover_image && (
                  <span className='absolute -bottom-6 left-0 text-xs text-red-500 w-max'>{errors.cover_image}</span>
                )}
              </label>

              <div className='lg:self-end flex items-center gap-2 text-sm text-[#509baf]'>
                <ClockIcon className='size-5' />
                <span className='font-mono'>Reading time: {calculateReadingTime(data.content)}</span>
                <div className='group relative'>
                  <QuestionMarkCircleIcon className='size-5' />
                  <span className='absolute hidden opacity-0 group-hover:block group-hover:opacity-100 transition-all bg-[#509baf] w-max -top-12 right-0 p-3 rounded-sm text-zinc-50'>
                    An average reading speed. 200 words per minutes.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {previewImage && (
            <div className='space-y-6 pb-6 w-full rounded-xl'>
              <img src={previewImage} alt="preview image" className='w-full h-full object-cover rounded-xl' />
              <Button onClick={handleRemoveImageUpload} variant='danger'>Remove Photo</Button>
            </div>
          )}

          {blog && blog.cover_image && (
            <div className='space-y-6 pb-6 w-full rounded-xl'>
              <img src={blog.visible_cover_image} alt="preview image" className='w-full h-full object-cover rounded-xl' />
              <Button onClick={handleRemoveBlogImage} variant='danger'>Remove Photo</Button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
export default BlogForm
