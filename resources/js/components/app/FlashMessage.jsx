import React, { useState, useEffect } from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const FlashMessage = ({ message, type = 'success', onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [shrink, setShrink] = useState(false); // Progress bar အတွက် state

  useEffect(() => {
    const startTimer = setTimeout(() => setShrink(true), 50);

    const autoClose = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(autoClose);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  if (!message) return null;
  const isSuccess = type === 'success';
  return (
    <div
      className={`
        fixed top-6 right-1/2 translate-x-1/2 sm:right-6 sm:translate-x-0 z-100 overflow-hidden
        w-[90%] sm:w-auto min-w-[320px] max-w-md
        flex items-center gap-3 p-4 rounded-2xl border shadow-2xl backdrop-blur-md
        transition-all duration-300 ease-out
        ${isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95 pointer-events-none'}
        ${isSuccess
          ? 'bg-white/90 dark:bg-zinc-900/90 border-[#509baf]/20'
          : 'bg-rose-50/90 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800'}
      `}
    >
      {/* Icon Area */}
      <div className={`shrink-0 p-2 rounded-xl ${isSuccess ? 'bg-[#509baf]/10' : 'bg-rose-500/10'}`}>
        {isSuccess ? (
          <CheckCircleIcon className="size-6 text-[#509baf]" />
        ) : (
          <ExclamationCircleIcon className="size-6 text-rose-500" />
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-black tracking-tight leading-none mb-1 ${isSuccess ? 'text-zinc-900 dark:text-zinc-100' : 'text-rose-900 dark:text-rose-100'}`}>
          {isSuccess ? 'Success' : 'Attention Needed'}
        </p>
        <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 truncate">
          {message}
        </p>
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="shrink-0 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 transition-colors"
      >
        <XMarkIcon className="size-4" />
      </button>

      {/* --- Smooth Progress Bar --- */}
      <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-2xl">
        <div
          className={`h-full transition-transform duration-5000 ease-linear origin-left ${isSuccess ? 'bg-[#509baf]' : 'bg-rose-500'}`}
          style={{
            transform: shrink ? 'scaleX(0)' : 'scaleX(1)'
          }}
        />
      </div>
    </div>
  );
};

export default FlashMessage;