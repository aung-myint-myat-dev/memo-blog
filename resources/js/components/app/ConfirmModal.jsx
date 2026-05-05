import React from 'react';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ConfirmModal = ({
  show,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger",
  processing = false,
  children
}) => {
  if (!show) return null;

  const theme = {
    danger: "bg-rose-600 hover:bg-rose-700 shadow-rose-600/20 text-white",
    warning: "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20 text-white",
    info: "bg-[#509baf] hover:bg-[#3d7a8a] shadow-[#509baf]/20 text-white"
  };

  const iconTheme = {
    danger: "bg-rose-50 dark:bg-rose-500/10 text-rose-600",
    warning: "bg-amber-50 dark:bg-amber-500/10 text-amber-500",
    info: "bg-cyan-50 dark:bg-cyan-500/10 text-[#509baf]"
  };

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl transition-all">

        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl">
          <XMarkIcon className="size-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className={`p-4 rounded-3xl mb-4 ${iconTheme[type]}`}>
            <ExclamationTriangleIcon className="size-8" />
          </div>

          <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 italic">
            {title}
          </h2>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
            {description}
          </p>
        </div>

        {/* Extra content (like password input) */}
        {children && <div className="mb-6 w-full">{children}</div>}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-5 py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm font-black rounded-2xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={processing}
            className={`flex-1 px-5 py-4 text-sm font-black rounded-2xl shadow-lg transition-all disabled:opacity-50 ${theme[type]}`}
          >
            {processing ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;