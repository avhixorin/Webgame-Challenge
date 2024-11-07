import React from 'react';

interface BadgeProps {
  avatar: string;
  username: string;
  score: number;
}

const ScoreCardBadge: React.FC<BadgeProps> = ({ avatar, username, score }) => {
  return (
    <div className="w-full flex items-center gap-4 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
      <div className="text-2xl">{avatar}</div>
      <div className="flex-1">
        <p className="text-lg font-semibold">{username}</p>
      </div>
      <div className="text-xl font-bold">{score}</div>
    </div>
  );
};

const playerInfo = [
  {
    avatar: '👨‍🚀',
    username: 'Player 1',
    score: 0,
  },
  {
    avatar: '👩‍🚀',
    username: 'Player 2',
    score: 0,
  },
];

const ScoreCard: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-md space-y-4 bg-gray-900 rounded-2xl shadow-xl">
      {playerInfo.map((player, index) => (
        <ScoreCardBadge key={index} avatar={player.avatar} username={player.username} score={player.score} />
      ))}
    </div>
  );
};

export default ScoreCard;
