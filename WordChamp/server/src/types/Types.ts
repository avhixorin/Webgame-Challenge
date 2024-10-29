export type OnlineUser = {
  userId: string;
  socketId: string;
};

export type RegisterData = {
  user: OnlineUser;
};

export type HostRoomData = {
  room: {
    roomId: string;
    roomPassword: string;
  };
  user: OnlineUser;
};

export type JoinRoomData = {
  room: {
    roomId: string;
    roomPassword: string;
  };
  user: OnlineUser;
};

export type MessageData = {
  message: {
    roomId: string;
    content: string;
  };
};
