// import React, { useState } from 'react'
// import { ImageIcon } from '../icons/Index'
// import { Link, router, useForm } from '@inertiajs/react'
// import FormError from '../blog/FormError';

// function ImageUploadForm({ className, id, exisitingImage }) {
//   const [previewImage, setPreviewImage] = useState(exisitingImage || null);
//   const { data, setData, put, processing, errors, reset } = useForm({
//     profile_image: null,
//   });

//   const handleUploadFile = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPreviewImage(URL.createObjectURL(file));
//     }
//     setData('profile_image', file);
//   }

//   const submit = (e) => {
//     e.preventDefault();
//     put(`/profile/upload-image/${id}`, {
//       onSuccess: () => {
//         document.getElementById('upload_profile_modal').close();
//         reset();
//       },
//     })
//   }

//   return (
//     <form onSubmit={submit} className={`${className} flex flex-col items-center gap-3 w-full h-[50vh]`}>
//       <input
//         type="file"
//         onChange={handleUploadFile}
//         name='profile_image'
//         className="file-input file-input-xs lg:file-input-md file-input-ghost w-full" />
//       {errors.profile_image && (<FormError message={errors.profile_image} />)}

//       {previewImage ? (
//         <>
//           <div className='w-full flex-1 max-w-[200px] aspect-square overflow-hidden'>
//             <img src={previewImage} alt="Profile preview" className='w-full h-full object-cover' />
//           </div>
//           <button type='submit' className='btn btn-xs lg:btn-sm btn-primary w-full'>Update</button>
//         </>
//       ) : (
//         <span className='text-xs block w-full text-center mt-5 flex-1 flex items-center justify-center'>No Profile uploaded.</span>
//       )}

//       {exisitingImage && (
//         <Link as="button" method="put" onSuccess={() => document.getElementById('upload_profile_modal').close()} href={`/profile/remove-image/${id}`} type='submit' className='btn btn-xs lg:btn-sm btn-error w-full'>Delete Profile Image</Link>
//       )}
//     </form>
//   )
// }

// export default ImageUploadForm

import React, { useState } from 'react'
import { ImageIcon } from '../icons/Index'
import { Link, router, useForm } from '@inertiajs/react'
import FormError from '../blog/FormError';
import { PhotoIcon, TrashIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

function ImageUploadForm({ className, id, existingImage, setShowModal }) {
  const [previewImage, setPreviewImage] = useState(existingImage || null);

  // Inertia useForm မှာ Image upload လုပ်ရင် method က post ပဲ ဖြစ်ရမယ် (Laravel မှာ _method: 'PUT' နဲ့ handle လုပ်တာ ပိုအဆင်ပြေတယ်)
  // ဒါပေမယ့် မင်းလက်ရှိ code အတိုင်းပဲ put နဲ့ အရင်ထားပေးမယ်
  const { data, setData, post, processing, errors, reset } = useForm({
    profile_image: null,
  });

  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Memory Leak မဖြစ်အောင် ပုံဟောင်းရဲ့ Object URL ကို ရှင်းထုတ်တာ ပိုကောင်းတယ်
      if (previewImage && previewImage.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage);
      }
      setPreviewImage(URL.createObjectURL(file));
      setData('profile_image', file);
    }
  }

  const submit = (e) => {
    e.preventDefault();
    router.post(`/profile/upload-image/${id}`, {
      _method: 'put',
      profile_image: data.profile_image,
    }, {
      onSuccess: () => {
        // const modal = document.getElementById('upload_profile_modal');
        // if (modal) modal.close();
        setShowModal(false);
        reset();
      },
    });
  }

  return (
    <div className={`${className} w-full space-y-6`}>
      <form onSubmit={submit} className="flex flex-col items-center gap-6">

        {/* Upload Zone */}
        <div className="relative group w-full">
          <label className={`
            relative flex flex-col items-center justify-center w-full aspect-square md:aspect-video 
            rounded-4xl border-2 border-dashed transition-all cursor-pointer overflow-hidden
            ${errors.profile_image
              ? 'border-rose-400 bg-rose-50 dark:bg-rose-500/5'
              : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:border-[#509baf]/50'}
          `}>
            {previewImage ? (
              <div className="relative w-full h-full">
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white dark:bg-zinc-900 p-3 rounded-2xl shadow-xl">
                    <PhotoIcon className="size-6 text-[#509baf]" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <div className="p-4 rounded-3xl bg-white dark:bg-zinc-800 shadow-sm mb-4">
                  <ArrowUpTrayIcon className="size-8 text-zinc-400" />
                </div>
                <p className="text-sm font-bold text-zinc-600 dark:text-zinc-300">Click to upload image</p>
                <p className="text-xs text-zinc-400 mt-1">PNG, JPG up to 2MB</p>
              </div>
            )}

            <input
              type="file"
              className="hidden"
              onChange={handleUploadFile}
              accept="image/*"
            />
          </label>
        </div>

        {errors.profile_image && <FormError message={errors.profile_image} />}

        {/* Action Buttons */}
        <div className="flex flex-col w-full gap-3">
          <button
            type="submit"
            disabled={processing || !data.profile_image}
            className="w-full py-4 bg-[#509baf] disabled:bg-zinc-200 dark:disabled:bg-zinc-800 text-white font-black rounded-2xl shadow-lg shadow-[#509baf]/20 transition-all active:scale-[0.98]"
          >
            {processing ? 'Updating...' : 'Upload Image'}
          </button>

          {existingImage && (
            <Link
              as="button"
              method="put"
              href={`/profile/remove-image/${id}`}
              onSuccess={() => setShowModal(false)}
              className="w-full py-4 flex items-center justify-center gap-2 text-rose-500 font-bold text-sm hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-colors"
            >
              <TrashIcon className="size-4" />
              Remove Current Image
            </Link>
          )}
        </div>
      </form>
    </div>
  )
}

export default ImageUploadForm