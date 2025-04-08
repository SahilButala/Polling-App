import React from 'react'

const TrendingPoll = ({stats}) => {
  return (
    <div className='bg-slate-100/50 rounded-lg overflow-hidden sticky top-[80px] z-20 p-4 mt-3'>
        <h6 className='mt-2 font-medium'>Tending Polls</h6>
        <div className='mt-4'>
                {
                    stats.map((stat,i)=>(
                        <div className='flex items-center justify-between rounded-lg cursor-pointer mb-1 px-3 py-1 hover:bg-slate-300/50'  key={i}>
                               <p className='text-xs text-slate-900'>{stat.label}</p>
                               <span className='text-xs text-slate-600 rounded py-[12px] px-4 '>{stat.count}</span>
                            </div>
                    ))
                }
        </div>
    </div>
  )
}

export default TrendingPoll