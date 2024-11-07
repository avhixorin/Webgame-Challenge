import React from 'react';

interface BadgeProps {
  avatar: string;
  username: string;
  score: number;
  roundedClass: string;
}

const ScoreCardBadge: React.FC<BadgeProps> = ({ avatar, username, score, roundedClass }) => {
  return (
    <div className={`w-full flex items-center gap-4 py-3 px-4 bg-white/20 backdrop-blur-md ${roundedClass} shadow-lg transform transition-transform duration-200 hover:scale-[1.02] border-b border-white/30`}>
      <div className="text-2xl">{avatar}</div>
      <div className="flex-1">
        <p className="text-lg font-semibold text-white">{username}</p>
      </div>
      <div className="text-xl font-bold text-white">{score}</div>
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
    <div className="flex flex-col items-center w-full max-w-md shadow-lg overflow-hidden">
      {playerInfo.map((player, index) => (
        <ScoreCardBadge 
          key={index} 
          avatar={player.avatar} 
          username={player.username} 
          score={player.score} 
          roundedClass={index === 0 ? 'rounded-t-lg' : index === playerInfo.length - 1 ? 'rounded-b-lg' : ''} 
        />
      ))}
    </div>
  );
};

export default ScoreCard;
