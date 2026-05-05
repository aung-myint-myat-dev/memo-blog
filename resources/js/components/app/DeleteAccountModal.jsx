import React from 'react';
import { useForm } from '@inertiajs/react';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const DeleteAccountModal = ({ onClose }) => {
  // Inertia form helper
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    password: '',
  });

  const submitDelete = (e) => {
    e.preventDefault();

    destroy('/delete-account', {
      preserveScroll: true,
      onSuccess: () => onClose(),
      onError: () => reset(),
      onFinish: () => reset(),
    });
  };

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">

        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
        >
          <XMarkIcon className="size-5" />
        </button>

        <form onSubmit={submitDelete}>
          <div className="flex flex-col items-center text-center mb-8">
            <div className="p-4 bg-rose-50 dark:bg-rose-500/10 rounded-3xl text-rose-600 mb-4">
              <ExclamationTriangleIcon className="size-8" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
              Delete Account?
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Your data will be deleted permanently. Cannot be recovered!
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 ml-2 uppercase tracking-widest">
              Pleas confirm your Password
            </label>
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className={`w-full px-5 py-4 bg-zinc-100 dark:bg-zinc-800 border-2 rounded-2xl text-sm transition-all outline-none
                                ${errors.password
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-transparent focus:border-[#509baf]'
                }`}
              placeholder="Enter password to confirm"
              autoFocus
            />
            {errors.password && (
              <p className="text-xs text-rose-500 font-bold ml-2">
                {errors.password}
              </p>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm font-black rounded-2xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="flex-1 px-5 py-4 bg-rose-600 text-white text-sm font-black rounded-2xl hover:bg-rose-700 disabled:opacity-50 shadow-lg shadow-rose-600/20 transition-all"
            >
              {processing ? 'Deleting...' : 'Delete Permanently'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccountModal;