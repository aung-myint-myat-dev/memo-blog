import React from 'react';
import {
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const Contact = () => {
  const socials = [
    {
      name: 'Email',
      value: 'aungmyintmyat.personal.dev@gmail.com',
      link: 'mailto:aungmyintmyat.personal.dev@gmail.com',
      icon: <EnvelopeIcon className="size-6" />,
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      name: 'Telegram', // မင်းရဲ့ username ပြောင်းပါ
      link: 'https://t.me/@amm_dev',
      icon: <ChatBubbleLeftRightIcon className="size-6" />,
      color: 'bg-[#24A1DE]/10 text-[#24A1DE]',
    },
    {
      name: 'Whatsapp',
      link: 'https://wa.me/959767416492?text=Hello%20Aung',
      icon: <ChatBubbleLeftRightIcon className="size-6" />,
      color: 'bg-[#1877F2]/10 text-[#1877F2]',
    },
    {
      name: 'Viber',
      link: 'viber://chat?number=+959767416492',
      icon: <ChatBubbleLeftRightIcon className="size-6" />,
      color: 'bg-[#7360F2]/10 text-[#7360F2]',
    }
  ];

  return (
    <div className="py-6 px-4 max-w-4xl mx-auto flex flex-col items-center">
      {/* Header Section */}
      <div className='text-center mb-8'>
        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 italic tracking-tighter mb-6 uppercase">
          Get in <span className="text-[#509baf]">Touch</span>
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-lg max-w-2xl mx-auto font-bold px-5">
          Memo အတွက်အကြံပေးချင်တာပဲဖြစ်ဖြစ်၊ Project အပ်ချင်တာပဲဖြစ်ဖြစ် အောက်က platform တွေကနေ တစ်ဆင့် အချိန်မရွေး ဆက်သွယ်လို့ရပါတယ်ဗျ။
        </p>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-2 gap-6 w-full">
        {socials.map((social, index) => (
          <a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none hover:border-[#509baf] dark:hover:border-[#509baf] transition-all flex items-center gap-5"
          >
            <div className={`size-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${social.color}`}>
              {social.icon}
            </div>
            <div className='overflow-hidden'>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">
                {social.name}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Optional: Footer Note */}
      <div className="mt-8 text-center">
        <p className="text-xs font-black uppercase tracking-widest text-zinc-400">
          Thank for visiting.
        </p>
      </div>
    </div>
  );
};

export default Contact;