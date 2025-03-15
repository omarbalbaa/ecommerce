import React from 'react'

function SkeletonProductInfo() {
  return (
    <div>
        <div className='h-[20px] w-[400px] mt-2 bg-slate-900 animate-pulse'></div>
        <div className='h-[20px] w-[400px] mt-2 bg-slate-900 animate-pulse'></div>
        <div className='h-[20px] w-[400px] mt-2 bg-slate-900 animate-pulse'></div>
        <div className='h-[20px] w-[400px] mt-2 bg-slate-900 animate-pulse'></div>
    </div>
    
  )
}

export default SkeletonProductInfo