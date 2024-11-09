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

export enum GameMode {
  SOLO = "solo",
  MULTIPLAYER = "multiplayer"
}

// User-related types
export type User = {
  id: string;
  username: string;
  avatar: string;
  theme: Theme;
};

// Room-related types
export type Room = {
  roomId: string;
  roomPassword: string;
};

export type RoomData = {
  roomId: string;
  password: string;
  members: User[];
  currentNoOfParticipants: number;
  status: RoomStatus;
};

export type HostRoomData = {
  room: Room;
  user: User;
};

export type JoinRoomData = {
  room: Room;
  user: User;
};

// Messaging-related types
export type MessageData = {
  roomId: string;
  content: string;
};

export type Message = {
  message: string;
  sender: User;
  roomId: string;
};

// Gameplay-related types
export type Answer = {
  word: string;
  verdict: Verdict;
};

export type SharedGameData = {
  maxGameParticipants: number;
  currentGameString: string;
  gameMode: GameMode | null;
  difficulty: Difficulty;
};

export type IndividualGameData = {
  score: number;
  powerUps: string[];
  isHosting: boolean;
  isJoiningRoom: boolean;
}

export type Words = {
  wordCount: number;
  words: string[];
  guessedWords: string[];
  wordsFetched: boolean;
};

// API response types

export type HostingResponse = {
  statusCode: number;
  message: string;
  data: {
    userCount: number;
  };
};

export type StartGameResponse = {
  statusCode: number;
  message: string;
  data: {
    gameData: SharedGameData;
  };
}

export type JoiningResponse = {
  statusCode: number;
  message: string;
  data: {
    userCount: number;
    allUsers: User[];
    maxGameParticipants: number;
  };
};

export type LeaveRoomResponse = {
  message: string;
  userId: string;
};

export type NoOfUsersResponse = {
  userCount: number;
};

export type NewUserResponse = {
  message: string;
  user: User;
};
