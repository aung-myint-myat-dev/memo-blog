import { Link, useForm } from '@inertiajs/react'
import React from 'react'

function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember_token: false,
  });

  const submit = (e) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <div className='flex items-center w-full justify-center px-4'>
      <div className='w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-zinc-200/50 dark:shadow-none'>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className='text-2xl font-black italic tracking-tighter uppercase text-zinc-900 dark:text-zinc-100'>
            Welcome <span className="text-[#509baf]">Back</span>
          </h2>
        </div>

        <form onSubmit={submit} className="space-y-5 flex flex-col">
          {/* Email */}
          <div className="space-y-1">
            <input
              type="email"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              placeholder="Email Address"
              className={`w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#509baf] transition-all outline-none ${errors.email ? 'ring-2 ring-rose-500' : ''}`}
              autoFocus
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

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between px-2">
            <label
              htmlFor="remember_token"
              className='flex items-center gap-2 cursor-pointer group'>
              <input
                type="checkbox"
                name='remember_token'
                checked={data.remember_token}
                onChange={e => setData('remember_token', e.target.checked)}
                id='remember_token'
                className='checkbox checkbox-sm rounded-lg border-zinc-300 dark:border-zinc-700 checked:bg-[#509baf]'
              />
              <span className='text-xs font-bold text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors'>
                Remember me
              </span>
            </label>

            {/* For later feature. */}
            {/* optional: Forgot Password link */}
            {/* <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-[#509baf] hover:underline">
              Forgot?
            </Link> */}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={processing}
            className='w-full py-4 bg-zinc-900 dark:bg-[#509baf] text-white text-sm font-black rounded-2xl hover:opacity-90 disabled:opacity-50 transition-all shadow-xl shadow-zinc-900/10 dark:shadow-[#509baf]/10'
          >
            {processing ? (
              <div className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-xs"></span>
                <span>LOGGING IN...</span>
              </div>
            ) : 'LOG IN'}
          </button>
        </form>

        {/* Footer Link */}
        <div className='mt-8 text-center'>
          <p className="text-sm text-zinc-500 font-bold">
            Don't have an account? {' '}
            <Link href="/register" className='text-[#509baf] font-black uppercase tracking-widest hover:underline'>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login