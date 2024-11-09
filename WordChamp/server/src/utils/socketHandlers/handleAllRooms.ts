import { Server, Socket } from "socket.io";
import Room from "../../rooms/room";
import ApiResponse from "../ApiResponse/ApiResponse";
import { SOCKET_EVENTS } from "../../constants/SocketEvents";
import { UserData } from "../../types/Types";

class RoomHandler {
  private static instance: RoomHandler;
  private rooms: Room[] = [];
  private io: Server | null = null;

  private constructor() {}

  public static getInstance(): RoomHandler {
    if (!RoomHandler.instance) {
      RoomHandler.instance = new RoomHandler();
    }
    return RoomHandler.instance;
  }

  public setIo(io: Server): void {
    this.io = io;
  }

  public addRoom(room: Room): ApiResponse {
    this.rooms.push(room);
    return new ApiResponse(200, "Room created successfully");
  }

  public hostRoom(room: Room, user: UserData, socket: Socket): ApiResponse {
    const newRoom = new Room(room.roomId, room.roomPassword);
    newRoom.addUser(user, socket);
    this.addRoom(newRoom);

    if (this.io) {
      this.io.to(room.roomId).emit(SOCKET_EVENTS.NO_OF_USERS, { userCount: newRoom.users.length });
    }

    return new ApiResponse(200, "Room hosted successfully", {
      userCount: newRoom.users.length,
    });
  }

  public joinRoom(roomId: string, roomPassword: string, user: UserData, socket: Socket): ApiResponse {
    const room = this.rooms.find((r) => r.roomId === roomId);
    if (!room) return new ApiResponse(404, "Room not found");
    if (!room.validatePassword(roomPassword)) return new ApiResponse(401, "Incorrect password");
    if (room.users.length >= 3) return new ApiResponse(403, "Room is full");

    const addRes: ApiResponse = room.addUser(user, socket);
    if (addRes.statusCode !== 200) {
      return addRes;  
    }

    if (this.io) {
      this.io.to(roomId).emit(SOCKET_EVENTS.NO_OF_USERS, { userCount: room.users.length });
      
      // Announce that a new user has joined the room, excluding the new user
      socket.broadcast.to(roomId).emit(SOCKET_EVENTS.NEW_USER, {
        message: `${user.username} has joined the room.`,
        userId: user.Id,
      });
    }

    return new ApiResponse(200, "Joined room successfully", { userCount: room.users.length });
  }

  public getRoomById(roomId: string): Room | undefined {
    return this.rooms.find((room) => room.roomId === roomId);
  }

  public removeUserFromRoom(socketId: string): ApiResponse {
    let roomIndex: number = -1;
    let userIndex: number = -1;
    let userCount: number = -1;
    let leavingUser: UserData | undefined;

    this.rooms.forEach((room, index) => {
        const user = room.users.find((u) => u.socketId === socketId);
        if (user) {
            roomIndex = index;
            userIndex = room.users.indexOf(user);
            leavingUser = user.user;
            userCount = room.users.length;
        }
    });

    if (roomIndex !== -1 && userIndex !== -1 && leavingUser !== undefined) {
        const room = this.rooms[roomIndex];
        room.users.splice(userIndex, 1);
        userCount = room.users.length;

        if (this.io) {
            this.io.to(room.roomId).emit(SOCKET_EVENTS.LEAVE_ROOM, {
                message: `${leavingUser.username} has left the room.`,
                userId: leavingUser.Id,
            });

            if (room.users.length > 0) {
                this.io.to(room.roomId).emit(SOCKET_EVENTS.NO_OF_USERS, { userCount });
            } else {
                this.rooms.splice(roomIndex, 1);
            }
        }

        return new ApiResponse(200, "User removed successfully", { userCount });
    } else {
        return new ApiResponse(404, "User not found in any room");
    }
  }

  public broadcastMessage(roomId: string, sender: UserData, message: string, socket: Socket): ApiResponse {
    const room = this.getRoomById(roomId);
    if (!room) return new ApiResponse(404, "Room not found");

    if (this.io) {
      // Send the message to everyone in the room except the sender
      socket.broadcast.to(roomId).emit(SOCKET_EVENTS.NEW_MESSAGE, {
        message,
        sender: sender.username,
        userId: sender.Id,
      });
    }

    return new ApiResponse(200, "Message broadcasted successfully");
  }
}

export default RoomHandler.getInstance();
