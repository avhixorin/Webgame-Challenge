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
import CTAButton from "@/utils/CTAbutton/CTAbutton";

const avatars = [
  { name: "Hikari-Blade", src: "./images/avatar4.png" },
  { name: "Ryuu-Reign", src: "./images/avatar3.png" },
  { name: "Nami-Storm", src: "./images/avatar2.png" },
  { name: "Aki-Rei", src: "./images/avatar1.png" },
];

export default function Welcome() {
  const dispatch = useDispatch();
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [username, setUsername] = useState("@");
  const navigate = useNavigate();
  const { playEnterSound, playBackgroundMusic, stopBackgroundMusic } = useSound();

  useEffect(() => {
    playBackgroundMusic("./sounds/background1.mp3");
    return () => stopBackgroundMusic();
  }, [playBackgroundMusic, stopBackgroundMusic]);

  const handleEnter = useCallback(() => {
    stopBackgroundMusic();
    playEnterSound();
    dispatch(
      setUser({
        id: uuid(),
        username,
        avatar: selectedAvatar,
        theme: Theme.LIGHT,
      })
    );
    navigate("/pg2");
  }, [
    stopBackgroundMusic,
    playEnterSound,
    dispatch,
    username,
    selectedAvatar,
    navigate,
  ]);

  const avatarList = useMemo(() => avatars, []);
  const [muted, setMuted] = useState(false);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden bg-game-bg bg-center bg-cover bg-white">
      <Dialogue />
      <div className="absolute top-10 left-10 z-10">
        {muted ? (
          <button
            onClick={() => {
              setMuted(false);
              playBackgroundMusic("./sounds/background1.mp3");
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
        )}
      </div>
      <div className="absolute inset-0 opacity-70"></div>
      <div className="absolute max-w-lg h-full bg-scroll bg-center bg-cover"></div>

      <div className="absolute inset-0 overflow-hidden"></div>

      <div className="relative bg-transparent font-super rounded-3xl p-8 max-w-md w-full space-y-8 z-10 shadow-2xl shadow-neonAccent/40">
        <div className="text-4xl md:text-5xl font-bold text-center animate-bounce text-slate-300 dark:text-neonBlue">
          Welcome to WORD CHAMP!
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-200 dark:text-neonAccent text-center">
            Choose Your Avatar
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {avatarList.map((avatar, index) => (
              <button
                key={index}
                className={`p-4 rounded-xl transition-transform duration-300 ease-in-out ${
                  selectedAvatar === index
                    ? "bg-neonBlue scale-110 shadow-lg shadow-neonBlue/50"
                    : "bg-white/10 backdrop-blur-sm hover:backdrop-blur-md hover:scale-105 hover:shadow-lg hover:"
                }`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img
                  src={avatar.src}
                  alt={avatar.name}
                  className={`w-12 h-12 mx-auto ${
                    selectedAvatar === index ? "opacity-100" : "opacity-70"
                  }`}
                />
                <p className={`mt-2 text-center font-bold text-sm ${
                  selectedAvatar === index ? "text-red-700" : "text-slate-700"
                }`}>
                  {avatar.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 flex flex-col justify-center">
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-[#1A2136] border-none placeholder-gray-400 text-white rounded-lg focus:ring-2 focus:ring-neonBlue"
          />
          {/* <Button
            className="w-full py-3 px-6 bg-gradient-to-r from-neonBlue to-neonAccent text-black font-semibold rounded-lg shadow-md hover:from-[#00CFFF] hover:to-[#1E90FF] focus:outline-none focus:ring-2 focus:ring-neonAccent focus:ring-opacity-75 transition-all duration-300"
            onClick={handleEnter}
          >
            Enter Game
          </Button> */}
          <CTAButton label="Enter Game" onClick={handleEnter} />
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
