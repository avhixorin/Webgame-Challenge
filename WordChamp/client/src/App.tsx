import React from 'react'
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom'

const App:React.FC = () => {
  return (
    <div className='w-full h-full'>
      <Outlet />
      <Toaster
  position="top-center"
  reverseOrder={true}
/>
    </div>
  )
}

export default App
