import React from 'react'

function FormError({className, message}) {
  return (
    <div className={`${className} text-xs text-red-500 my-1`}>{message}</div>
  )
}

export default FormError
