import { setLayoutProps } from '@inertiajs/react'
import BlogForm from '../../components/blog/BlogForm'

function Edit({ categories, blog}) {
  setLayoutProps({
    title: "Edit Blog"
  })
  return (
    <BlogForm categories={categories} blog={blog}/>
  )
}

export default Edit
