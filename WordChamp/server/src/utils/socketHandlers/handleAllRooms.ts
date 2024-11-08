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

    // Emit user count to all clients in the room
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
      return addRes;  // Return if user could not be added
    }

    // Emit user count update to all clients in the room after user joins
    if (this.io) {
      this.io.to(roomId).emit(SOCKET_EVENTS.NO_OF_USERS, { userCount: room.users.length });
    }

    return new ApiResponse(200, "Joined room successfully", { userCount: room.users.length });
  }

  public getRoomById(roomId: string): Room | undefined {
    return this.rooms.find((room) => room.roomId === roomId);
  }
}

export default RoomHandler.getInstance();
