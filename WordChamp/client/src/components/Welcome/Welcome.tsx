import { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/Redux/features/userSlice";
import { v4 as uuid } from "uuid";
import { Theme } from "@/types/types";
import useSound from "@/hooks/useSound";
import { Volume, VolumeX } from "lucide-react";
import Dialogue from "@/utils/Dialogue/Dialogue";

const avatars = [
  { name: "HikariBlade", src: "./images/avatar4.png" },
  { name: "RyuuReign", src: "./images/avatar3.png" },
  { name: "NamiStorm", src: "./images/avatar2.png" },
  { name: "AkiRei", src: "./images/avatar1.png" },
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

  const avatarList = useMemo(() => avatars, []);
  const [muted, setMuted] = useState(false);
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden bg-game-bg bg-center bg-cover bg-white ">
      <Dialogue />
      <div className="absolute top-10 left-10 z-10">
        {
          muted ? (
            <button
              onClick={() => {
                setMuted(false);
                playBackgroundMusic('./sounds/background1.mp3');
              }}
            >
              <VolumeX size={32} stroke="#fdfdfd" />
            </button>
          ) : (
            <button
              onClick={() => {
                setMuted(true);
                stopBackgroundMusic();
              }}
            >
              <Volume size={32} stroke="#fdfdfd" />
            </button>
          )
        }
        
      </div>
      <div className="absolute inset-0 opacity-70 "></div>
      
      {/* Background floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* {backgroundElements} */}
      </div>

      <div className="relative bg-[#C2EB73] rounded-3xl p-8 max-w-md w-full space-y-8 z-10 shadow-xl">
        <div
          className="text-4xl md:text-5xl font-bold text-center  animate-bounce"
          style={{ fontFamily: "'Super', sans-serif" }}
        >
          Welcome to WORD CHAMP!
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-purple-300 text-center">
            Choose Your Avatar
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {avatarList.map((avatar, index) => (
              <button
                key={index}
                className={`p-4 rounded-xl transition-transform duration-300 ease-in-out ${
                  selectedAvatar === index
                    ? "bg-purple-600 scale-110 shadow-md shadow-purple-600/50"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img
                  src={avatar.src}
                  alt={avatar.name}
                  className={`w-12 h-12 mx-auto ${
                    selectedAvatar === index
                      ? "opacity-100"
                      : "opacity-70"
                  }`}
                />
                <p className="mt-2 text-center text-sm text-white">{avatar.name}</p>
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
          50% { transform: translateY(-40px); }
        }

        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(-5px); }
          50% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
