import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    <div className="w-full flex flex-col md:flex-row justify-between items-center">

          
          <CardContent className="p-4">
          <Card className={`
          ${backGround}
          
           rounded-md shadow-md
          transition-all
          `} style={{"transitionDuration": "0.2s",backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",}} >
            <CardHeader>
              <CardTitle className="
              text-white text-lg sm:text-xl md:text-2xl">
                PowerUps Section
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap justify-center gap-4 p-4">
              <Button className="bg-white text-green-700 hover:bg-gray-100"
              onClick={() => handlePowerUpClick(1)}
              >
                Power Up 1
              </Button>
              <Button className="bg-white text-green-700 hover:bg-gray-100"
              onClick={() => handlePowerUpClick(2)}
              >
                Power Up 2
              </Button>
              <Button className="bg-white text-green-700 hover:bg-gray-100"
              onClick={() => handlePowerUpClick(3)}
              >
                Power Up 3
              </Button>
            </CardContent>
          </Card>
        </CardContent>
        </div>
  )
}

export default PowerUpSection
