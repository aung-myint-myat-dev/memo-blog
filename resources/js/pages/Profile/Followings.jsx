// import React from 'react'

// function Followings({ followings }) {
//   return (
//     <div className='mt-10 relative'>
//       <h2 className='sticky top-0 left-0 text-2xl font-[700]'>Followings</h2>
//       {followings.length > 0 ? (
//         <ul className="list bg-base-100 rounded-box shadow-md mt-3">
//           {followings.map(following => (
//             <li key={following.id} className="list-row">
//               <div className='size-10 rounded-full overflow-hidden'><img className="w-full h-full object-cover" src={following.visible_profile_image} /></div>
//               <div>
//                 <div>{following.name}</div>
//                 <div className="text-xs uppercase font-semibold opacity-60">{following.readable_followed_at}</div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <span>No followings</span>
//       )}
//     </div>
//   )
// }

// export default Followings
import { Link, setLayoutProps } from '@inertiajs/react'
import { UserPlusIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

function Followings({ followings }) {
  setLayoutProps({
    title: "Followings",
  })

  return (
    <div className="max-w-2xl mx-auto px-4 mt-5 pb-20">
      {followings.length > 0 ? (
        <div className="space-y-2">
          {followings.map(follower => (
            <Link
              key={follower.id}
              href={`/profile/${follower.name}`} // Follower ရဲ့ profile ကို သွားလို့ရအောင်
              className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 hover:border-[#509baf]/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all group"
            >
              {/* Avatar */}
              <div className="size-12 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  src={follower.visible_profile_image}
                  alt={follower.name}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-black text-zinc-900 dark:text-zinc-100 truncate">
                  {follower.name}
                </div>
                <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-tight mt-0.5">
                  Followed {follower.readable_followed_at}
                </div>
              </div>

              {/* Action/Arrow */}
              <div className="size-8 flex items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-400 group-hover:text-[#509baf] group-hover:bg-[#509baf]/10 transition-colors">
                <ChevronRightIcon className="size-4" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-[2.5rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
          <UserPlusIcon className="size-12 text-zinc-300 dark:text-zinc-700 mb-4" />
          <p className="text-zinc-500 dark:text-zinc-400 font-bold">No followings yet</p>
          <p className="text-xs text-zinc-400">Share your profile to get more followings!</p>
        </div>
      )}
    </div>
  )
}

export default Followings