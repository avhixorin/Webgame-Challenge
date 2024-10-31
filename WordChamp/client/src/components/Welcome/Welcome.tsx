import { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skull, Zap, Star, Target, Shield, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/Redux/features/userSlice";
import { v4 as uuid } from "uuid";
import { Theme, User } from "@/types/types";
import useSound from "@/hooks/useSound";

const avatars = [
  { icon: Skull, name: "Skull" },
  { icon: Zap, name: "Zap" },
  { icon: Star, name: "Star" },
  { icon: Target, name: "Target" },
  { icon: Shield, name: "Shield" },
  { icon: Flame, name: "Flame" },
];

export default function Welcome() {
  const dispatch = useDispatch();
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { playEnterSound, playBackgroundMusic, stopBackgroundMusic } = useSound();

  useEffect(() => {
    playBackgroundMusic('./sounds/background1.mp3');
    return () => stopBackgroundMusic();
  }, [playBackgroundMusic, stopBackgroundMusic]);

  const handleEnter = useCallback(() => {
    stopBackgroundMusic();
    playEnterSound();
    dispatch(setUser({ id: uuid(), username, avatar: selectedAvatar, theme: Theme.LIGHT }));
    navigate("/pg2");
  }, [stopBackgroundMusic, playEnterSound, dispatch, username, selectedAvatar, navigate]);

  const backgroundElements = useMemo(() => {
    return [...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute bg-gradient-to-r from-purple-300 to-pink-300 opacity-30 rounded-full"
        style={{
          width: `${Math.random() * 250}px`,
          height: `${Math.random() * 250}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `float ${15 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`,
        }}
      ></div>
    ));
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden bg-center bg-cover bg-white">
      
      <div className="absolute inset-0 opacity-70 bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-200"></div>
      
      {/* Background floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundElements}
      </div>

      <div className="relative bg-gray-900 bg-opacity-40 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full space-y-8 z-10 shadow-xl">
        <div
          className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 animate-bounce"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Welcome to WORD CHAMP!
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-purple-300 text-center">
            Choose Your Avatar
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {avatars.map((avatar, index) => (
              <button
                key={index}
                className={`p-4 rounded-xl transition-transform duration-300 ease-in-out ${
                  selectedAvatar === index
                    ? "bg-purple-600 scale-110 shadow-md shadow-purple-600/50"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
                onClick={() => setSelectedAvatar(index)}
              >
                <avatar.icon
                  className={`w-10 h-10 mx-auto ${
                    selectedAvatar === index
                      ? "text-white fill-current"
                      : "text-purple-400"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-800 border-none placeholder-gray-400 text-white rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <Button
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-300"
            onClick={handleEnter}
          >
            Enter Game
          </Button>
        </div>
      </div>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap");

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(-10px); }
          50% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
