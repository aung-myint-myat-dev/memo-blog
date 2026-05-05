// // import React from 'react'

// // function Button({ children, variant = 'primary', className = '', icon, ...props }) {

// //   // Base style & Animation
// //   const baseStyle = "px-4 py-2 rounded-full font-medium transition-all duration-100 ease-in-out transform";

// //   // နိပ်လိုက်ရင် ကျွံဝင်သွားတဲ့ effect
// //   const activeEffect = "active:translate-y-0.5 active:scale-[0.97] active:shadow-inner";

// //   const variants = {
// //     primary: "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 shadow-md",
// //     secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200 shadow-sm",
// //     outline: "border border-zinc-300 bg-transparent text-zinc-900 hover:bg-zinc-100",

// //     // ✅ Ghost Variant: ပုံမှန်ဆိုရင် ပွင့်လင်းမြင်သာ (Transparent) ဖြစ်နေမယ်
// //     ghost: "bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 active:bg-zinc-200"
// //   };

// //   const selectedVariant = variants[variant] || variants.primary;

// //   return (
// //     <button 
// //       className={`${baseStyle} ${activeEffect} ${selectedVariant} ${className} ${icon && 'flex items-center gap-2'}`}
// //       {...props}
// //     >
// //       {icon && icon}
// //       {children}
// //     </button>
// //   )
// // }

// // export default Button;

// import React from 'react'

// function Button({ children, variant = 'primary', className = '', icon, ...props }) {

//   // Base Style: Transition နဲ့ Active (ကျွံဝင်) effect
//   const baseStyle = "rounded-full font-semibold text-base transition-all duration-100 ease-in-out transform active:translate-y-0.5 active:scale-[0.98]";

//   const variants = {
//     // Primary: Light မှာ အမည်း/ Dark မှာ အဖြူ
//     primary: `bg-zinc-900 text-zinc-50 hover:bg-zinc-800 
//               dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-md`,

//     // Secondary: Light မှာ မီးခိုးဖျော့/ Dark မှာ မီးခိုးရင့်
//     secondary: `bg-zinc-100 text-zinc-900 hover:bg-zinc-200 
//                 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700`,

//     danger: `bg-red-500 text-zinc-100 hover:bg-red-600 border border-red-500 dark:border-red-500`,

//     // Outline: ပတ်လည်ဘောင်လေးပဲပါမယ်
//     outline: `bg-transparent border border-zinc-300 text-zinc-900 hover:bg-zinc-100 
//               dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800`,

//     // Ghost: Background မပါဘူး၊ Hover မှ အရောင်တက်မယ်
//     ghost: `bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 
//             dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50`
//   };

//   const selectedVariant = variants[variant] || variants.primary;

//   return (
//     <button
//       className={`${baseStyle} ${selectedVariant} ${className ? className : 'px-4 py-2'} ${icon && 'flex items-center gap-2'}`}
//       {...props}
//     >
//       {icon}
//       {children}
//     </button>
//   )
// }

// export default Button;

import React from 'react'

function Button({ children, variant = 'primary', className = '', icon, ...props }) {

  // Brand Color Constant
  const brandColor = "#509baf";

  // Base Style: Transition နဲ့ Active (ကျွံဝင်) effect
  const baseStyle = "rounded-full font-bold text-sm transition-all duration-200 ease-in-out transform active:translate-y-0.5 active:scale-[0.98] select-none";

  const variants = {
    // Brand: မင်းကြိုက်တဲ့ #509baf အရောင် (Primary အနေနဲ့ သုံးလို့ရတယ်)
    brand: `text-white shadow-sm hover:brightness-110`,

    // Primary: Light မှာ အမည်း/ Dark မှာ အဖြူ (Brand color hover ပါမယ်)
    primary: `bg-zinc-900 text-zinc-50 hover:bg-zinc-800 
              dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-md`,

    // Secondary: Light မှာ မီးခိုးဖျော့/ Dark မှာ မီးခိုးရင့်
    secondary: `bg-zinc-100 text-zinc-900 hover:bg-zinc-200 
                dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700`,

    danger: `bg-red-500 text-zinc-100 hover:bg-red-600 border border-red-500 dark:border-red-500`,

    // Outline: ပတ်လည်ဘောင်လေးပဲပါမယ် (Hover ရင် Brand color သန်းမယ်)
    outline: `bg-transparent border border-zinc-300 text-zinc-900 hover:border-[#509baf] hover:text-[#509baf]
              dark:border-zinc-600 dark:text-zinc-100 dark:hover:border-[#509baf] dark:hover:text-[#509baf]`,

    // Ghost: Background မပါဘူး၊ Hover မှ အရောင်တက်မယ်
    ghost: `bg-transparent text-zinc-500 hover:bg-zinc-50 hover:text-[#509baf] 
            dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-[#509baf]`
  };

  const selectedVariant = variants[variant] || variants.primary;

  // inline style for exact brand color matching
  const customStyle = variant === 'brand' ? { backgroundColor: brandColor } : {};

  return (
    <button
      style={customStyle}
      className={`${baseStyle} ${selectedVariant} ${className ? className : 'px-5 py-2.5'} ${icon && 'flex items-center justify-center gap-2'}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  )
}

export default Button;