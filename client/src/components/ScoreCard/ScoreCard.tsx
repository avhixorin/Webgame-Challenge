import React from 'react';

type ScoreCardProps = {
    score:number
}
const ScoreCard:React.FC<ScoreCardProps> = ({ score }) => {
    

    
  return (
    <div className="flex items-center justify-center space-x-8 p-8">
      <div className="score-card flex flex-col items-center justify-center bg-[#0076A3] text-[#EB9373] border-8 border-gray-500 rounded-md p-6 w-24 h-48 text-8xl font-bold">
        <span>{score}</span>
      </div>
    </div>
  );
};

export default ScoreCard;
