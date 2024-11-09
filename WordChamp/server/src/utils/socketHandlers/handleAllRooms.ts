import { Server, Socket } from "socket.io";
import Room from "../../rooms/room";
import ApiResponse from "../ApiResponse/ApiResponse";
import { SOCKET_EVENTS } from "../../constants/ServerSocketEvents";
import { SharedGameData, UserData } from "../../types/Types";

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

  public hostRoom(room: Room, user: UserData, maxGameParticipants:number, socket: Socket): ApiResponse {
    const newRoom = new Room(room.roomId, room.roomPassword, maxGameParticipants);
    newRoom.addUser(user, socket);
    this.addRoom(newRoom);

    if (this.io) {
      this.io.to(newRoom.roomId).emit(SOCKET_EVENTS.NO_OF_USERS, {
        userCount: newRoom.users.length,
      });
    }

    return new ApiResponse(200, "Room hosted successfully", {
      userCount: newRoom.users.length,
    });
  }

  public joinRoom(
    roomId: string,
    roomPassword: string,
    user: UserData,
    socket: Socket
  ): ApiResponse {
    const room = this.rooms.find((r) => r.roomId === roomId);
    if (!room) return new ApiResponse(404, "Room not found");
    if (!room.validatePassword(roomPassword))
      return new ApiResponse(401, "Incorrect password");
    if (room.users.length >= 3) return new ApiResponse(403, "Room is full");

    const addRes: ApiResponse = room.addUser(user, socket);
    if (addRes.statusCode !== 200) {
      return addRes;
    }

    if (this.io) {
      this.io.to(roomId).emit(SOCKET_EVENTS.NO_OF_USERS, {
        userCount: room.users.length,
      });

      // Announce that a new user has joined the room, excluding the new user
      socket.broadcast.to(roomId).emit(SOCKET_EVENTS.NEW_USER, {
        message: `${user.username} has joined the game.`,
        user: user,
      });
    }

    return new ApiResponse(200, "Joined room successfully", {
      userCount: room.users.length,
      allUsers: room.getAllUsers(),
      maxGameParticipants: room.maxGameParticipants
    });
  }

  public getRoomById(roomId: string): Room | undefined {
    return this.rooms.find((room) => room.roomId === roomId);
  }

  public removeUserFromRoom(socketId: string): ApiResponse {
    let roomIndex: number = -1;
    let leavingUser: UserData | undefined;

    const room = this.rooms.find((r, index) => {
      const user = r.users.find((u) => u.socketId === socketId);
      if (user) {
        roomIndex = index;
        leavingUser = user.user;
        return true;
      }
      return false;
    });

    if (room && leavingUser) {
      room.users = room.users.filter((u) => u.socketId !== socketId);

      if (this.io) {
        this.io.to(room.roomId).emit(SOCKET_EVENTS.LEAVE_ROOM, {
          message: `${leavingUser.username} has left the game.`,
          userId: leavingUser.Id,
        });

        if (room.users.length > 0) {
          this.io.to(room.roomId).emit(SOCKET_EVENTS.NO_OF_USERS, {
            userCount: room.users.length,
          });
        } else {
          this.rooms.splice(roomIndex, 1); // Remove empty room
        }
      }

      return new ApiResponse(200, "User removed successfully", {
        userCount: room.users.length,
      });
    } else {
      return new ApiResponse(404, "User not found in any room");
    }
  }
  public startGame(roomId: string, requesterSocket: Socket,gameData:SharedGameData): ApiResponse {
    const room = this.getRoomById(roomId);
    if (!room) return new ApiResponse(404, "Room not found");
  
    if (this.io) {
      // Emit the start game event to all users in the room except the requester
      requesterSocket.broadcast.to(roomId).emit(SOCKET_EVENTS.START_GAME, {
        message: "The game has started!",
      });
    }
  
    return new ApiResponse(200, "Game started successfully");
  }
  
  public broadcastMessage(
    roomId: string,
    sender: UserData,
    message: string,
    socket: Socket
  ): ApiResponse {
    const room = this.getRoomById(roomId);
    if (!room) return new ApiResponse(404, "Room not found");
    if (!room.isUserInRoom(sender.Id))
      return new ApiResponse(403, "Sender is not a member of the room");

    if (this.io) {
      // Send the message to everyone in the room except the sender
      socket.broadcast.to(roomId).emit(SOCKET_EVENTS.NEW_MESSAGE, {
        message,
        sender,
      });
    }

    return new ApiResponse(200, "Message sent successfully");
  }
}

export default RoomHandler.getInstance();
