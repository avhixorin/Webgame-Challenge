import { Card, CardHeader } from '@/components/ui/card'
import React from 'react'
import FriendsSection from './FriendsSection/FriendsSection'

const FriendsScore:React.FC = () => {
    const friends = [
        {
          avatar: "https://randomuser.me/api/portraits/thumb/women/71.jpg",
          username: "GalaxyWarrior",
          score: 1240,
        },
        {
          avatar: "https://randomuser.me/api/portraits/thumb/women/75.jpg",
          username: "StarShooter",
          score: 980,
        },
        {
          avatar: "https://randomuser.me/api/portraits/thumb/women/77.jpg",
          username: "LunarLad",
          score: 1150,
        },
      ];
  return (
    <Card className="w-full">
        <CardHeader>Scores:</CardHeader>
        {friends.map((friend, index) => (
          <FriendsSection key={index} friend={friend} />
        ))}
      </Card>
  )
}

export default FriendsScore
