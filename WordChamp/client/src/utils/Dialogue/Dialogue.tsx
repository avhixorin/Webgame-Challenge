import { Cross } from 'lucide-react'
import React from 'react'
import CTAbutton from '../CTAbutton/CTAbutton'

const Dialogue = ({title,icon1,icon2,icon3}) => {
  return (
    <div className='absolute z-50 w-[28rem] h-64 bg-transparent'>
      <img src="./images/dialogue.png" className='absolute w-full h-full' alt="" />
      <div className='absolute z-10 w-full h-full '>
        <Cross className='absolute top-[2.17rem] right-[0.39rem] cursor-pointer rotate-45' stroke='#000' fill='#FFF5D8'  size={28} 
        onClick={()=>console.log('close')}
        />
        <div className='w-full text-2xl text-[#F6F4E1] py-2 text-center font-extrabold'>
           Title 
        </div>
        <CTAbutton title='Confirm' width='w-20' height='h-5' />
      </div>
    </div>
  )
}

export default Dialogue
