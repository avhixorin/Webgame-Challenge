import { Card, CardContent } from "@/components/ui/card";
import React from "react";

type Friend = {
  avatar: string;
  username: string;
  score: number;
};

type FriendsSectionProps = {
  friend: Friend;
};

const FriendsSection: React.FC<FriendsSectionProps> = ({ friend }) => {
  return (
    <Card className="bg-transparent transform hover:scale-105 transition-all duration-300 ease-in-out border-none rounded-none">
      <CardContent className="w-full flex gap-4 items-center px-4 ">
        <img
          src={friend.avatar}
          alt="Friend Avatar"
          className="rounded-full w-10 h-10 border-2 border-white shadow-md"
        />
        <div className="text-center">
          <p className="text-zinc-500 text-lg font-semibold">{friend.username}</p>
          <p className="text-zinc-400 text-sm">Score: {friend.score}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FriendsSection;
