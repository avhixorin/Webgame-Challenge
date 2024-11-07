import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Power, PowerIcon } from 'lucide-react'
import React, { useState } from 'react'

const PowerUpSection:React.FC = () => {
    const [backGround,setBackground] = useState<string>("bg-green-400")
    const handlePowerUpClick = (power: number) => {
        if (power === 1) {
          setBackground("bg-power1");
        } else if (power === 2) {
          setBackground("bg-power2 bg-center object-contain");
        } else if (power === 3) {
          setBackground("bg-power3");
        }
      
        setTimeout(() => {
          setBackground("bg-green-400");
        }, 4000);
      };
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-end">
          
          <img src="./images/thunder.svg" className='cursor-pointer' alt="" />
          
        </div>
  )
}

export default PowerUpSection
