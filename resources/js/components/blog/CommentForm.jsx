// import { Link, useForm } from "@inertiajs/react"
// import { SendIcon, XCrossIcon } from "../icons/Index";
// import { useEffect, useRef, useState } from "react";

// function CommentForm({ comment, blogId, onCancel }) {
//   const inputRef = useRef(null);
//   const [showCloseBtn, setShowCloseBtn] = useState(false);
//   const { data, setData, post, put, processing, errors, reset, cancel } = useForm({
//     blog_id: comment?.blog_id ?? blogId,
//     content: comment?.content ?? "",
//   });

//   useEffect(() => {
//     if (comment) {
//       setData('blog_id', comment.blog_id);
//       setData('content', comment.content);
//       inputRef.current?.focus();
//       setShowCloseBtn(true);
//     }
//   }, [comment]);

//   function handleCancleEdit() {
//     onCancel();
//     reset();
//     setShowCloseBtn(false);
//   }

//   function submit(e) {
//     e.preventDefault();
//     // For update
//     if (comment) {
//       put(`/comment/${comment.id}`, {
//         preserveScroll: true,
//         onSuccess: () => {
//           reset();
//           setShowCloseBtn(false);
//           onCancel();
//         },
//       })
//     } else {
//       // For Create
//       post('/comment', {
//         preserveScroll: true,
//         onSuccess: () => reset(),
//       });
//     }
//   }

//   return (
//     <>
//       <form onSubmit={submit}
//         className='sticky bottom-18 lg:bottom-5 backdrop-blur-3xl bg-base-300/50 left-0 input input-sm sm:input-md w-full'>
//         {/* Content Input */}
//         <input
//           ref={inputRef}
//           value={data.content}
//           name="content"
//           onChange={(e) => setData("content", e.target.value)}
//           type="text"
//           placeholder="Enter your comment"
//           className="w-full" />

//         {processing ? (
//           <span className="loading loading-spinner loading-xs"></span>
//         ) : (
//           <button type="submit" ><SendIcon className="size-4" /></button>
//         )}

//         {showCloseBtn && (
//           <button onClick={handleCancleEdit}><XCrossIcon className="size-4" /></button>
//         )}
//       </form>
//     </>
//   )
// }

// export default CommentForm

import { useForm } from "@inertiajs/react"
import { SendIcon, XCrossIcon } from "../icons/Index";
import { useEffect, useRef, useState } from "react";

function CommentForm({ comment, blogId, onCancel, onSuccess }) {
  const inputRef = useRef(null);
  const [showCloseBtn, setShowCloseBtn] = useState(false);
  const brandColor = "#509baf";

  const { data, setData, post, put, processing, errors, reset } = useForm({
    blog_id: comment?.blog_id ?? blogId,
    content: comment?.content ?? "",
  });

  useEffect(() => {
    if (comment) {
      setData('blog_id', comment.blog_id);
      setData('content', comment.content);
      inputRef.current?.focus();
      setShowCloseBtn(true);
    }
  }, [comment]);

  function handleCancelEdit() {
    onCancel();
    reset();
    setShowCloseBtn(false);
  }

  function submit(e) {
    e.preventDefault();
    if (!data.content.trim()) return;

    if (comment) {
      // For Update
      put(`/comment/${comment.id}`, {
        preserveScroll: true,
        onSuccess: () => {
          reset();
          setShowCloseBtn(false);
          onCancel();
          if (onSuccess) onSuccess(); // Auto Scroll ခေါ်မယ်
        },
      })
    } else {
      // For Create
      post('/comment', {
        preserveScroll: true,
        onSuccess: () => {
          reset();
          if (onSuccess) onSuccess(); // Auto Scroll ခေါ်မယ်
        },
      });
    }
  }

  return (
    <form onSubmit={submit} className="relative w-full">
      <div className="relative flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-2xl border-2 border-transparent focus-within:border-[#509baf]/50 focus-within:bg-white dark:focus-within:bg-zinc-900 transition-all duration-300 shadow-sm">

        {/* Content Input */}
        <input
          ref={inputRef}
          value={data.content}
          onChange={(e) => setData("content", e.target.value)}
          type="text"
          placeholder={comment ? "Edit your comment..." : "Write a comment..."}
          className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-3 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 font-medium focus:outline-none"
        />

        <div className="flex items-center gap-1 pr-1">
          {/* Close Button (Edit mode မှာပဲ ပြမယ်) */}
          {showCloseBtn && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
            >
              <XCrossIcon className="size-4" />
            </button>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={processing || !data.content.trim()}
            style={{ backgroundColor: brandColor }}
            className="p-2.5 rounded-xl text-white shadow-lg shadow-[#509baf]/20 active:scale-95 disabled:opacity-50 disabled:grayscale transition-all"
          >
            {processing ? (
              <span className="size-4 block border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <SendIcon className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {errors.content && (
        <p className="absolute -top-6 left-2 text-[10px] font-bold text-red-500 uppercase">
          {errors.content}
        </p>
      )}
    </form>
  )
}

export default CommentForm