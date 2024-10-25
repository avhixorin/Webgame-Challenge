import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import FriendsSection from "../FriendsSection/FriendsSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store/store";
import { useToast } from "@/hooks/use-toast";
import { Filter } from "bad-words";
import { addScore } from "@/Redux/features/userGameDataSlice";
import useValidate from "@/hooks/validateWord";
import useComplexity from "@/hooks/checkComplexity";
import useMistake from "@/hooks/checkNegatives";

const InputSection: React.FC = () => {
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
  const { toast } = useToast();
  const dispatch = useDispatch();
  const filter = new Filter();
  const gameString = useSelector((state: RootState) =>
    state.userGameData.currentGameString.toUpperCase().split("")
  );
  const [inputWord, setInputWord] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputWord(e.target.value);
  };
  const validate = useValidate(inputWord.toLowerCase());
  const { getScore } = useComplexity();
  const { getNegativeScore } = useMistake();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (filter.isProfane(inputWord)) {
      toast({
        title: "🚫 Offensive Word Detected!",
        description: "Please refrain from using inappropriate language.",
        className: "bg-red-500 rounded-md text-white",
        color: "white",
      });
      dispatch(addScore(-3));
      return;
    }

    const isValid = await validate();
    if (isValid) {
      const finalScore = getScore(inputWord.toLowerCase());
      toast({
        title: "🎉 Hooray! You did it! 🎉",
        description: `That's a valid word! You just scored a sweet +${finalScore} points! 🥳`,
        className:
          "bg-white/25 rounded-md border border-white/20 backdrop-blur-lg text-white",
        color: "white",
      });

      setInputWord("");
    } else {
      getNegativeScore(gameString.join(""), inputWord);
    }
  };
  return (
    <Card className="w-full flex flex-col md:flex-row bg-transparent gap-4 justify-between items-center border-none shadow-none">
      <Card className="w-full">
        <CardHeader>Scores:</CardHeader>
        {friends.map((friend, index) => (
          <FriendsSection key={index} friend={friend} />
        ))}
      </Card>
      <Card className="w-full">
        <p>My score Section</p>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl md:text-2xl text-white">
            Input Section
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="flex space-x-2 mt-2">
            <Input
              type="text"
              placeholder="Enter something..."
              className="flex-1 text-gray-900"
              value={inputWord.toUpperCase()}
              onChange={handleInputChange}
            />
            <Button type="submit" className="text-white">
              Enter
            </Button>
          </CardContent>
        </form>
      </Card>
    </Card>
  );
};

export default InputSection;
