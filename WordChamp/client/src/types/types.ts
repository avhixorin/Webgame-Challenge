export enum Theme {
  LIGHT = "light",
  DARK = "dark"
}

export enum Verdict {
  RIGHT = "right",
  WRONG = "wrong",
  PROFANE = "profane"
}

export enum RoomStatus {
  HOSTING = "hosting",
  JOINING = "joining",
  NONE = "none",
}

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
  GOD = "god"
}

export enum gameMode {
  SOLO = "solo",
  MULTIPLAYER = "multiplayer"
}

// Types related to user
export type User = {
  id: string;
  username: string;
  avatar: string;
  theme: Theme;
};

// Types related to rooms and connections
export type Room = {
  roomId: string;
  roomPassword: string;
};

export type HostRoomData = {
  room: Room;
  user: User;
};

export type JoinRoomData = {
  room: Room;
  user: User;
};

// Types related to messaging
export type MessageData = {
  message: {
      roomId: string;
      content: string;
  };
};

// Types related to gameplay
export type Answer = {
  word: string;
  verdict: Verdict;
};

export type GameData = {
  score: number;
  powerUps: string[];
  participants: number;
  currentGameString: string;
  gameMode: gameMode | null;
  difficulty: Difficulty;
  isHosting: boolean;
  isJoiningRoom: boolean;
};

export type Words = {
  wordCount: number;
  words: string[];
  guessedWords: string[];
  wordsFetched: boolean;
};

// Types related to API responses

export type UserCountResponse = {
  userCount: number;
};

export type hostingResponse = {
  statusCode: number,
  message:string,
  data:{
    userCount: number
  }
}

export type joiningResponse = {
  statusCode: number,
  message:string,
  data:{
    userCount: number,
    allUsers : User[]
  }
}

export type leaveRoomResponse = {
  message: string,
  userId: string,
}

export type noOfUsersResponse = {
  userCount: number,
}

export type newUserResponse = {
  message: string,
  user: User,
}

export type Message = {
  message: string,
  sender: User,
}