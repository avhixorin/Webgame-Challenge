import { RootState } from '@/Redux/store/store';
import React from 'react';
import { useSelector } from 'react-redux';

interface BadgeProps {
  avatar: string;
  username: string;
  score: number;
  roundedClass: string;
}

const ScoreCardBadge: React.FC<BadgeProps> = ({ avatar, username, score, roundedClass }) => {
  return (
    <div
      className={`w-full flex items-center gap-4 py-3 px-4 bg-white/20 backdrop-blur-md ${roundedClass} shadow-lg transform transition-transform duration-200 hover:scale-[1.02] border-b border-white/30`}
    >
      <div className="text-2xl">{avatar}</div>
      <div className="flex-1">
        <p className="text-lg font-semibold text-white">{username}</p>
      </div>
      <div className="text-xl font-bold text-white">{score}</div>
    </div>
  );
};

const ScoreCard: React.FC = () => {
  const {scores} = useSelector((state: RootState) => state.scores);
  const avatar = ["👑", "🔥", "⚡"];

  return (
    <div className="flex flex-col items-center w-full shadow-lg overflow-hidden">
      {scores.map((scoreObj, index) => (
        <ScoreCardBadge
          key={scoreObj.user.id} 
          avatar={avatar[index % avatar.length]}
          username={scoreObj.user.username} 
          score={scoreObj.score} 
          roundedClass={
            index === 0
              ? 'rounded-t-lg'
              : index === scores.length - 1
              ? 'rounded-b-lg'
              : ''
          }
        />
      ))}
    </div>
  );
};

export default ScoreCard;
