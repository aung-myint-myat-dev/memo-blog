import React from 'react';
import { BookOpenIcon, RocketLaunchIcon, SparklesIcon } from '@heroicons/react/24/outline';

const About = () => {
  const features = [
    {
      title: "Clean Reading",
      desc: "စာဖတ်ရတာ သက်သောင့်သက်သာရှိစေမယ့် Minimalist Design နဲ့ တည်ဆောက်ထားပါတယ်။",
      icon: <BookOpenIcon className="size-6" />
    },
    {
      title: "Fast & Modern",
      desc: "Laravel, React နဲ့ Inertia.js ကို သုံးထားလို့ မြန်ဆန်ပေါ့ပါးတဲ့ Experience ကို ရစေမှာပါ။",
      icon: <RocketLaunchIcon className="size-6" />
    },
    {
      title: "Creative Space",
      desc: "မင်းရဲ့ စိတ်ကူးစိတ်သန်းတွေကို ဝေမျှဖို့ အကောင်းဆုံး နေရာတစ်ခုဖြစ်ပါတယ်။",
      icon: <SparklesIcon className="size-6" />
    }
  ];

  return (
    <div className="py-6 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 italic tracking-tighter mb-6">
          What is Memo?
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
          Memo ဆိုတာ နည်းပညာနဲ့ အနုပညာကို ပေါင်းစပ်ထားတဲ့ Personal Blog တစ်ခုဖြစ်ပါတယ်။
          ဒီမှာ မင်းရဲ့ အတွေ့အကြုံတွေကို ရေးသားနိုင်သလို တခြားသူတွေရဲ့ ဗဟုသုတတွေကိုလည်း လေ့လာနိုင်ပါတယ်။
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <div key={i} className="p-8 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl hover:border-[#509baf] transition-all group">
            <div className="size-12 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center text-[#509baf] shadow-sm mb-6 group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100 mb-2">{f.title}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;