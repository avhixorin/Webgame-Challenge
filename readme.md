# Word Champ 🏆

**WordChamp** is a thrilling **Word Battle Royale** game designed for word enthusiasts and casual gamers alike! 🎮💥 Whether you're looking to sharpen your vocabulary, challenge your friends, or just enjoy a quick word adventure, **WordChamp** has something for everyone!

The game combines **competitive gameplay**, **interactive UI**, and **dynamic difficulty levels**, making it an exciting and immersive experience. 🌟 From solo players to multiplayer squads, dive in and prove you're the ultimate word champion! 🏅🧠

With sleek, modern design and engaging mechanics, **WordChamp** is the perfect way to test your word skills and have fun online. Ready to play? 🎉
## 🙏 **Acknowledgements** 🌟

- [React Documentation](https://react.dev/)  
  For providing a solid foundation to build an interactive and dynamic frontend. ⚛️

- [Tailwind CSS](https://tailwindcss.com/)  
  For its utility-first framework, making the design sleek, stylish, and responsive. 💅

- [Socket.IO](https://socket.io/)  
  For enabling seamless real-time communication in multiplayer mode. ⚡

- [Open Source Community](https://opensource.guide/)  
  For inspiring collaborative development and providing resources that made this project possible. 🌍

A big shoutout to all the developers, libraries, and tools that made **WordChamp** a reality! 🚀✨
## 🛠️ **Tech Stack** 💻

**Client:** React, Redux, TailwindCSS 🚀, Socket.IO Client 🎮

**Server:** Node, Express 🌐, Socket.IO 🖥️
## WebSocket Events Reference  

The **WordChamp** backend communicates using WebSocket events via **Socket.IO**, enabling real-time multiplayer interactions. Below are the key events:  

---

### **Room Management**  

#### Create Room  
**Event:** `createRoom`  
- **Description:** Triggered to create a new multiplayer room. 🎲  
- **Payload:**  
  ```json
  {
    "room": {
        "roomId": "123abc",
        "roomPassword": "securePass123"
    },
    "user": {
        "id": "user123",
        "username": "WordMaster",
        "avatar": "wizard"
    },
    "maxGameParticipants": 4
  }


- **Response:**  
  ```json
  {
    "statusCode": 200,
    "message": "Room hosted successfully",
    "data": {
        "userCount": 1
    }
  }

**Event:** `joinRoom`  
- **Description:**  Triggered to join an existing multiplayer room.🚪
- **Payload:**  
  ```json
  {
    "room":{
        "roomId": "123abc",
        "roomPassword": "securePass123"
    },
    "user": {
        "id": "user456",    
        "username": "WordChampion",
        "avatar": "knight",
        "theme": "royal"
    }
  }


- **Response:**  
  ```json
  {
    "statusCode": 200,
    "message": "Joined room successfully",
    "data": {
        "players": [
            {
                "id": "user123",
                "username": "WordMaster",
                "avatar": "wizard",
                "theme": "magic"
            },
            {
                "id": "user456",
                "username": "WordChampion",
                "avatar": "knight",
                "theme": "royal"
            }
        ]
    }
  }

### **Gameplay Events**  

#### Create Room  
**Event:** `START_GAME`  
- **Description:** Triggered to initiate the start of a new game round. 🕹️ 
- **Payload:**  
  ```json
  {
    "room": {
        "roomId": "123abc",
        "roomPassword": "securePass123",
        "maxRoomPlayers": 4,
        "gameString": "",
        "roomDifficulty": "Hard"
    },
    "players": [
        {
        "id": "string",
        "username": "string",
        "avatar": "string",
        "theme": "Theme",
        "powerUps": ["PowerUp"],
        "answers": ["Answer"],
        "score": 0,
        "roomAction": "Hosting"
        }
    ],
    "guessedWords": ["string"]
  }



- **Response:**  
  ```json
  {
    "statusCode": 200,
    "message": "Game started successfully",
    "data": {
        {
            "room": {
                "roomId": "123abc",
                "roomPassword": "securePass123",
                "maxRoomPlayers": 4,
                "gameString": "",
                "roomDifficulty": "Hard"
            },
            "players": [
                {
                "id": "string",
                "username": "string",
                "avatar": "string",
                "theme": "Theme",
                "powerUps": ["PowerUp"],
                "answers": ["Answer"],
                "score": 0,
                "roomAction": "Hosting"
                }
            ],
            "guessedWords": ["string"]
        }
    }
  }

The WordChamp game is powered by a bunch of exciting WebSocket events that help players connect, compete, and have a blast in real-time! 🎮⚡ These events take care of everything, from managing rooms and gameplay actions to player interactions! 🙌 While we've spotlighted a couple of the main events like hostRoom and joinRoom 🏠🤝, there are a ton more that handle different parts of the game! 🕹️💥

Want the full scoop? 🧐 For all the details on every single event we’re using, check out the ClientSocketEvents.ts file in the codebase! It’s packed with a comprehensive list of event names, what each one does, and how they all work together to keep the game running smoothly. 🚀📜

Ready to dive in? 🏊‍♂️
## 🤝 **Contributing** 💡

We 💙 contributions and welcome them with open arms! 🙌

Want to get involved? Check out the **`contributing.md`** for ways to get started! 🚀

Please make sure to follow this project’s **`code of conduct`** to keep the community awesome! 🌟
## 🎮 **Check Out the Game in Action!** 🎉

Dive into the world of **Word Champ** and test your word skills! 🏆  

👉 [Play Now!](https://word-champ.vercel.app/) 🚀
## 💬 **We’d Love to Hear From You!** 📝

Got feedback or suggestions? We’re all ears! 🎧  

Reach out to us at 📧 [avhixorin](mailto:avhixorin@gmail.com) — let’s make **Word Champ** even better! 🚀
