import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
        <div className='w-screen h-screen md:w-1/2 px-12 pt-7 pb-12'>
            <h2 className='font-bold text-3xl'>Polling App</h2>
            {children}
        </div>
        <div className='hidden md:block w-1/2 h-screen bg-sky-50 object-cover relative'>
              <img src="https://img.freepik.com/free-vector/election-referendum-campaign_74855-6386.jpg?t=st=1743148094~exp=1743151694~hmac=1666397061ecd120bf038928a4fb9d43a79ad8d9b2ea4413d09f559d17f681b1&w=2000 " className='h-full object-cover bg-center' alt="" />
        </div>
    </div>
  )
}

export default AuthLayout