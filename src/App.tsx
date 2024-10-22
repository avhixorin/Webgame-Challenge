import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skull, Zap, Star, Target, Shield, Flame } from "lucide-react";

const avatars = [
  { icon: Skull, name: "Skull" },
  { icon: Zap, name: "Zap" },
  { icon: Star, name: "Star" },
  { icon: Target, name: "Target" },
  { icon: Shield, name: "Shield" },
  { icon: Flame, name: "Flame" },
];

export default function App() {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [username, setUsername] = useState("");

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 opacity-50 bg-gradient-to-r from-purple-600 to-pink-600"></div>
      
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-purple-500 opacity-30 rounded-full"
            style={{
              width: `${Math.random() * 300}px`,
              height: `${Math.random() * 300}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${10 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative bg-gray-800 bg-opacity-40 backdrop-blur-md rounded-3xl p-8 max-w-md w-full space-y-8 z-10">
        <h1
          className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Welcome to Word Battle Royale!
        </h1>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-purple-300 text-center">
            Choose Your Avatar
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {avatars.map((avatar, index) => (
              <button
                key={index}
                className={`p-4 rounded-xl transition-all duration-300 ease-in-out ${
                  selectedAvatar === index
                    ? "bg-purple-600 scale-110 shadow-lg shadow-purple-500/50"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => setSelectedAvatar(index)}
              >
                <avatar.icon
                  className={`w-12 h-12 mx-auto ${
                    selectedAvatar === index ? "text-black fill-white" : "text-purple-400"
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
            className="w-full bg-gray-700 border-none placeholder-gray-400 text-white rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <Button className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-300">
            Enter Game
          </Button>
        </div>
      </div>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap");

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
