export enum Theme {
  LIGHT = "light",
  DARK = "dark"
}

export enum Verdict {
  RIGHT = "right",
  WRONG = "wrong",
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

// Types related to user
export type User = {
  id: string;
  username: string;
  avatar: number | null;
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
  difficulty: Difficulty;
  isHosting: boolean;
  isJoiningRoom: boolean;
};

export type Words = {
  wordCount: number;
  words: string[];
  wordsFetched: boolean;
};

export type hostingResponse = {
  response:string
}

export type joiningResponse = {
  response:string
}
