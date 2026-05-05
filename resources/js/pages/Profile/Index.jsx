import { Link, router, setLayoutProps, usePage } from '@inertiajs/react';
import {
  ArrowLeftIcon,
  ArrowRightOnRectangleIcon, // Logout အတွက်
  CameraIcon,
  HeartIcon,
  SparklesIcon, // Level တွေအတွက်
  UserGroupIcon,
  DocumentTextIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import BlogCard from '../../components/blog/BlogCard';
import ImageUploadForm from '../../components/profile/ImageUploadForm';
import { useState } from 'react';
import DeleteAccountModal from '../../components/app/DeleteAccountModal';
import ConfirmModal from '../../components/app/ConfirmModal';

function Index({ user, isMyProfile, isFollowed }) {
  setLayoutProps({
    title: "Profile"
  })
  const { auth } = usePage().props;
  const [showModal, setShowModal] = useState(false);
  const [showAccDeleteModal, setShowAccDeleteModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleFollow = () => {
    router.post(`/profile/follow/${user.id}`, {}, {
      preserveScroll: true,
    });
  }

  const handleLogout = () => {
    router.post('/logout');
  }

  // --- Logic Helpers ---
  const followerLevel = (count) => {
    if (count > 5) return "Cele";
    if (count > 3) return "Famous";
    if (count >= 1) return "Starter";
    return "New Person";
  }

  const userBlogLevel = (count) => {
    if (count > 3) return "Writer";
    if (count > 2) return "Blogger";
    if (count >= 1) return "Contributor";
    return "Reader";
  }

  const getFollowingLevel = (count) => {
    if (count > 5) return "Socialite";
    if (count > 2) return "Friendly";
    if (count >= 1) return "Explorer";
    return "Loner";
  }

  return (
    <div className="relative min-h-full bg-white dark:bg-zinc-950 transition-colors duration-200 pb-20">

      {/* 1. Top Hero Section */}
      <div className="relative h-40 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 h-full flex items-end relative">
          {/* Profile Image */}
          <div className="absolute -bottom-16 left-4 md:left-8">
            <div className="relative group">
              <div className="size-32 md:size-40 rounded-3xl border-4 border-white dark:border-zinc-950 bg-zinc-200 dark:bg-zinc-800 overflow-hidden shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800">
                <img src={user.visible_profile_image} alt={user.name} className="w-full h-full object-cover" />
              </div>

              {isMyProfile && (
                <button
                  onClick={() => setShowModal(true)}
                  className="absolute bottom-2 right-2 p-2 bg-white/90 dark:bg-zinc-800/90 backdrop-blur rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 transition-all duration-200 hover:scale-110"
                >
                  <CameraIcon className="size-5 text-zinc-700 dark:text-zinc-200" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. User Info & Actions */}
      <div className="max-w-4xl mx-auto px-2 md:px-8 mt-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
              {user.name}
              <span className="text-[10px] bg-[#509baf]/10 text-[#509baf] px-2 py-0.5 rounded-full uppercase tracking-tighter">
                {userBlogLevel(user.blogs.length)}
              </span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium italic">@{user.name || 'user'}</p>
          </div>

          <div className="flex items-center gap-2">
            {isMyProfile ? (
              <>
                {/* <Link
                  href="/logout" method="post" as="button"
                  onBefore={() => confirm("Are you sure?")}
                  className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-sm rounded-lg hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="size-5" />
                  Logout
                </Link> */}
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-sm rounded-lg hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="size-5" />
                  Logout
                </button>
                <button
                  onClick={() => setShowAccDeleteModal(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-500 dark:bg-red-500 text-white font-bold text-sm rounded-lg hover:bg-red-600 dark:hover:bg-red-500/60 transition-colors"
                >
                  <TrashIcon className="size-5" />
                  Delete Account
                </button>
              </>

            ) : (
              <button
                onClick={handleFollow}
                className={`px-8 py-2.5 rounded-2xl font-bold text-sm transition-all shadow-lg ${isFollowed
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                  : 'bg-[#509baf] text-white shadow-[#509baf]/20 hover:scale-[1.02]'
                  }`}
              >
                {isFollowed ? 'Unfollow' : 'Follow User'}
              </button>
            )}
          </div>
        </div>

        {/* 3. Stats Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-10">
          <StatBox
            label="Followers"
            value={user.followers.length}
            level={followerLevel(user.followers.length)}
            icon={<HeartIcon className="hidden sm:block size-5" />}
            href={isMyProfile ? '/followers' : `/profile/${user.name}/followers`}
          />
          <StatBox
            label="Blogs"
            value={user.blogs.length}
            level={userBlogLevel(user.blogs.length)}
            icon={<DocumentTextIcon className="hidden sm:block size-5" />}
            href="#"
          />
          <StatBox
            label="Following"
            value={user.followings.length}
            level={getFollowingLevel(user.followings.length)}
            icon={<UserGroupIcon className="hidden sm:block size-5" />}
            href={isMyProfile ? '/followings' : `/profile/${user.name}/followings`}
          />
        </div>

        <div className="h-px w-full bg-zinc-100 dark:bg-zinc-900 my-10" />

        {/* 4. Blog Feed */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Recent Blogs</h2>
            {isMyProfile && (
              <Link href="/create" className="text-[#509baf] font-bold text-sm flex items-center gap-1 hover:underline">
                <PlusIcon className="size-4" /> New Post
              </Link>
            )}
          </div>

          <div className="space-y-2 md:space-y-6 max-w-xl mx-auto">
            {user.blogs.length > 0 ? (
              user.blogs.map(blog => (
                <BlogCard blog={blog} key={blog.id} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-[2rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                <p className="text-zinc-400 dark:text-zinc-500 font-medium">No blogs published yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Profile Upload Modal --- */}
      {showModal && (
        <div id='upload_profile_modal' className="fixed inset-0 top-0 left-0 z-55 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl p-8 border border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white italic">Update Profile Image</h3>
              <button onClick={() => setShowModal(false)} className="size-10 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">✕</button>
            </div>
            <ImageUploadForm id={user.id} existingImage={user.profile_image} setShowModal={setShowModal} />
          </div>
        </div>
      )}

      {showAccDeleteModal && (
        <DeleteAccountModal onClose={() => setShowAccDeleteModal(false)}/>
      )}

      {showLogoutConfirm && (
        <ConfirmModal show={showLogoutConfirm} onClose={() => setShowLogoutConfirm(false)} onConfirm={handleLogout} title='Are you sure want to logout?'/>
      )}
    </div>
  );
}

// --- Custom Sub-Component for Stats ---
function StatBox({ label, value, level, icon, href }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 group hover:border-[#509baf]/50 transition-[color] duration-300"
    >
      <div className="flex-1 flex items-center gap-2 mb-2 text-zinc-400 dark:text-zinc-500">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-xl font-black text-zinc-900 dark:text-white leading-none mb-1">{value}</span>
      <span className='text-[10px] font-bold text-[#509baf] mt-2'>
        {level}
      </span>
    </Link>
  );
}

export default Index;