import React from 'react'

import { Toaster } from "@/components/ui/toaster"
import { Outlet } from 'react-router-dom'
import { Bento } from './components/Game/Bento'

const App:React.FC = () => {
  return (
    <div className='w-full h-full'>
      {/* <Outlet />
      <Toaster /> */}
      <Bento />
    </div>
  )
}

export default App
