import { RootState } from "@/Redux/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LeaderBoard: React.FC = () => {
  const { scores } = useSelector((state: RootState) => state);

  const [rankedMembers, setRankedMembers] = useState<typeof scores.scores>([]);

  // Function to assign ranks based on the scores
  const assignRanks = () => {
    const sortedMembers = Object.values(scores.scores).sort((a, b) => b.score - a.score); 
    sortedMembers.forEach((member, index) => {
      member.rank = index + 1; 
    });
    return sortedMembers;
  };

  useEffect(() => {
    setRankedMembers(assignRanks());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scores]);

  return (
    <div className="bg-white/20 backdrop-blur-md text-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-3xl font-bold mb-4">LeaderBoard</h2>
      <div className="overflow-auto max-h-[300px]">
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4">Rank</th>
              <th className="py-2 px-4">Player</th>
              <th className="py-2 px-4">Score</th>
            </tr>
          </thead>
          <tbody>
            {rankedMembers.map((member) => (
              <tr key={member.id} className="border-t border-white">
                <td className="py-2 px-4">{member.rank}</td>
                <td className="py-2 px-4">{member.name}</td>
                <td className="py-2 px-4">{member.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;
