import Room from "../rooms/room";

export enum Theme {
  LIGHT = "light",
  DARK = "dark"
}

export type UserData = {
  Id: string;
  username: string;
  avatar: string;
  theme: Theme;
}
export type OnlineUser = {
  userData: UserData;
  socketId: string;
};

export type RegisterData = {
  user: UserData;
};

export type HostRoomData = {
  room: Room;
  user: UserData;
  maxGameParticipants: number;
};

export type JoinRoomData = {
  room: {
    roomId: string;
    roomPassword: string;
  };
  user: UserData;
};

export type MessageData = {
  roomId: string;
  user: UserData;
  message:string;
};
