import { Link, useForm } from '@inertiajs/react'
import React from 'react'

function Register() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post('/register');
  };

  return (
    <div className='flex items-center w-full justify-center px-4'>
      <div className='w-full max-w-2xl bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-zinc-200/50 dark:shadow-none'>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className='text-3xl font-black italic tracking-tighter uppercase text-zinc-900 dark:text-zinc-100'>
            Join <span className="text-[#509baf]">Us</span>
          </h2>
        </div>

        <form onSubmit={submit} className="space-y-4 md:grid md:grid-cols-2 md:gap-4">
          {/* Name */}
          <div className="space-y-1">
            <input
              type="text"
              value={data.name}
              onChange={e => setData('name', e.target.value)}
              placeholder="Full Name"
              className={`w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#509baf] transition-all outline-none ${errors.name ? 'ring-2 ring-rose-500' : ''}`}
              autoFocus
            />
            {errors.name && <span className="text-rose-500 text-[10px] font-black uppercase tracking-widest ml-2">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <input
              type="email"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              placeholder="Email Address"
              className={`w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#509baf] transition-all outline-none ${errors.email ? 'ring-2 ring-rose-500' : ''}`}
            />
            {errors.email && <span className="text-rose-500 text-[10px] font-black uppercase tracking-widest ml-2">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <input
              type="password"
              value={data.password}
              onChange={e => setData('password', e.target.value)}
              placeholder="Password"
              className={`w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#509baf] transition-all outline-none ${errors.password ? 'ring-2 ring-rose-500' : ''}`}
            />
            {errors.password && <span className="text-rose-500 text-[10px] font-black uppercase tracking-widest ml-2">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <input
              type="password"
              value={data.password_confirmation}
              onChange={e => setData('password_confirmation', e.target.value)}
              placeholder="Confirm Password"
              className={`w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#509baf] transition-all outline-none ${errors.password_confirmation ? 'ring-2 ring-rose-500' : ''}`}
            />
            {errors.password_confirmation && <span className="text-rose-500 text-[10px] font-black uppercase tracking-widest ml-2">{errors.password_confirmation}</span>}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={processing}
            className='col-span-2 w-full py-4 mt-2 bg-zinc-900 dark:bg-[#509baf] text-white text-sm font-black rounded-2xl hover:opacity-90 disabled:opacity-50 transition-all shadow-xl shadow-zinc-900/10 dark:shadow-[#509baf]/10'
          >
            {processing ? (
              <div className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-xs"></span>
                <span>CREATING ACCOUNT...</span>
              </div>
            ) : 'REGISTER'}
          </button>
        </form>

        {/* Footer Link */}
        <div className='mt-8 text-center'>
          <p className="text-sm text-zinc-500 font-bold">
            Already have an account? {' '}
            <Link href="/login" className='text-[#509baf] font-black uppercase tracking-widest hover:underline'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register