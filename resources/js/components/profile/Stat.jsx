import React from 'react'
import { HeartIcon } from '../icons/Index'
import { Link } from '@inertiajs/react'

function Stat({ label, value, des, icon, href }) {
  return (
    <Link href={href} className="stat">
      <div className="stat-figure text-secondary">
        {icon ?? <HeartIcon className="size-8" />}
      </div>
      <div className="stat-title">{label ?? "Stat Label"}</div>
      <div className="stat-value text-lg md:text-lg lg:text-3xl">{value ?? 1200}</div>
      <div className="stat-desc">{des ?? "This is description"}</div>
    </Link>
  )
}

export default Stat
