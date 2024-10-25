import { Card } from "@/components/ui/card";
import React from "react";

const GuessedWords: React.FC = () => {
  return (
    <Card className="w-full flex-wrap bg-transparent flex justify-center items-center py-4 border-none shadow-none">
      <p>Guessed Words Section</p>
    </Card>
  );
};

export default GuessedWords;
