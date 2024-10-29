type OnlineUser = {
  userId: string;
  socketId: string;
};

type RegisterData = {
  user: OnlineUser;
};

type HostRoomData = {
  room: {
    roomId: string;
    roomPassword: string;
  };
  user: OnlineUser;
};

type JoinRoomData = {
  room: {
    roomId: string;
    roomPassword: string;
  };
  user: OnlineUser;
};

type MessageData = {
  message: {
    roomId: string;
    content: string;
  };
};

export type {OnlineUser,RegisterData,HostRoomData,JoinRoomData,MessageData}
