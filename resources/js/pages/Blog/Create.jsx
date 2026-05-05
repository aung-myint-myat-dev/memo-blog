import { setLayoutProps } from '@inertiajs/react'
import BlogForm from '../../components/blog/BlogForm';

function Create({ categories }) {
  setLayoutProps({
    title: "New Blog",
  });

  return (
    <BlogForm categories={categories} />
  )
}

export default Create
