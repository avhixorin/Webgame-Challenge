'use client';

import React, { useState } from 'react';
import { MoreVertical, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface StartUpPageProps {
  onStartGame: (difficulty: string, participants: number) => void;
}

const StartUpPage: React.FC<StartUpPageProps> = ({ onStartGame }) => {
  const [showPopup, setShowPopup] = useState(true);
  const [difficulty, setDifficulty] = useState('Easy');
  const [participants, setParticipants] = useState(0);

  const togglePopup = () => setShowPopup(!showPopup);

  const handleConfirm = () => {
    setShowPopup(false);
    onStartGame(difficulty, participants);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white font-sans">
      <div className={`w-full h-full flex justify-center items-center ${showPopup ? 'blur-sm' : ''}`}>
        <h1 className="text-5xl font-bold text-fuchsia-500 animate-pulse">Welcome to the Epic Game</h1>
      </div>
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute top-4 right-4 text-white hover:text-cyan-400"
        onClick={togglePopup}
      >
        <MoreVertical className="h-6 w-6" />
      </Button>

      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 border-2 border-cyan-400 shadow-lg shadow-cyan-400/50 max-w-md w-11/12">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center text-fuchsia-500">Game Setup</DialogTitle>
          </DialogHeader>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4 text-white hover:text-fuchsia-500"
            onClick={() => setShowPopup(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty" className="text-lg font-semibold text-cyan-400">Select Difficulty:</Label>
              <div className="grid grid-cols-2 gap-2">
                {['Easy', 'Medium', 'Hard', 'God'].map((level) => (
                  <Button
                    key={level}
                    variant={difficulty === level ? "default" : "outline"}
                    onClick={() => setDifficulty(level)}
                    className={`${
                      difficulty === level 
                        ? 'bg-cyan-400 text-black' 
                        : 'bg-transparent text-cyan-400 hover:bg-cyan-400/20'
                    } border-2 border-cyan-400 transition-all duration-300`}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="participants" className="text-lg font-semibold text-green-400">Number of Participants:</Label>
              <Input
                id="participants"
                type="number"
                min="0"
                value={participants}
                onChange={(e) => setParticipants(parseInt(e.target.value) || 0)}
                className="bg-black/50 border-2 border-green-400 text-white placeholder-green-400/50"
              />
            </div>
            {participants > 0 && (
              <div className="space-y-2">
                <Label htmlFor="gameCode" className="text-lg font-semibold text-yellow-400">Game Code:</Label>
                <div className="bg-black/50 border-2 border-yellow-400 p-4 rounded-md font-mono text-yellow-400 text-center text-2xl animate-pulse">
                  XXXX-XXXX-XXXX
                </div>
              </div>
            )}
            <Button 
              onClick={handleConfirm}
              className="w-full bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-3 text-lg transition-all duration-300 animate-bounce"
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StartUpPage;
