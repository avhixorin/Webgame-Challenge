import React from 'react'
import { Card } from "@/components/ui/card"
import AlphabetSection from './AlphabetSection/Alphabets'
import InputSection from './InputSection/Input'
import FriendsScore from './FriendsScoreSection/FriendsScore'
import MyScore from './MyScoreSection/MyScore'
import ChatSection from './ChatSection/Chats'
import GuessedWords from './GuessedWords/GuessedWords'
import PowerUpSection from './PowerUpSection/PowerUp'

export  const Bento:React.FC = () => {
  return (
    <div className="container p-4">
      <div className="grid grid-cols-4 gap-4">
        <Card className="col-span-2 p-6 bg-white shadow-lg rounded-xl">
         <AlphabetSection />
        </Card>

        <Card className="col-span-2 row-span-1 p-6 bg-white shadow-lg rounded-xl relative overflow-hidden">
          
          <InputSection />
        </Card>
        

        <Card className="p-4 bg-white shadow-lg rounded-xl">
          <FriendsScore />
        </Card>

        <Card className="p-4 bg-gray-900 text-white shadow-lg rounded-xl flex items-center justify-center">
          <GuessedWords />
        </Card>
        <Card className="col-span-1 row-span-1 p-6 bg-white shadow-lg rounded-xl relative overflow-hidden">
          
          <PowerUpSection />
        </Card>
        <Card className="col-span-1 row-span-1 p-6 bg-white shadow-lg rounded-xl relative overflow-hidden">
          
          <ChatSection />
        </Card>

        {/* <Card className="p-4 bg-gray-900 text-white shadow-lg rounded-xl">
          
        </Card>

        <Card className="col-span-2 p-6 bg-white shadow-lg rounded-xl flex items-center justify-center">
          
        </Card>

        <Card className="p-4 bg-white shadow-lg rounded-xl">

        </Card> */}

         
        
      </div>
    </div>
  )
}