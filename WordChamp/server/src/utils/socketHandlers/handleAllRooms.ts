import Room from "../../rooms/room";
import { User } from "../../types/user";
import ApiResponse from "../ApiResponse/ApiResponse";

class RoomHandler {
  private static instance: RoomHandler;
  private rooms: Room[] = [];

  private constructor() {}

  public static getInstance(): RoomHandler {
    if (!RoomHandler.instance) {
      RoomHandler.instance = new RoomHandler();
    }
    return RoomHandler.instance;
  }

  public handleRequest(
    type: "hostRoom" | "joinRoom",
    roomData: { roomId: string; roomPassword: string },
    user: User
  ): ApiResponse {
    if (type === "hostRoom") {
      const newRoom = new Room(roomData.roomId, roomData.roomPassword);
      newRoom.addUser(user);
      this.rooms.push(newRoom);
      return new ApiResponse(200, "Room hosted successfully");
    }

    if (type === "joinRoom") {
      const foundRoom = this.rooms.find((r) => r.roomId === roomData.roomId);
      if (!foundRoom) {
        return new ApiResponse(404, "Room not found");
      }

      if (!foundRoom.validatePassword(roomData.roomPassword)) {
        return new ApiResponse(401, "Incorrect password");
      }

      const addUserResult = foundRoom.addUser(user);
      if (addUserResult === "Room is full. Cannot add more participants.") {
        return new ApiResponse(403, addUserResult);
      }

      return new ApiResponse(200, "Joined room successfully");
    }

    return new ApiResponse(400, "Invalid request type");
  }

  public getRoomById(roomId: string): Room | undefined {
    return this.rooms.find((room) => room.roomId === roomId);
  }

  public getRoomUsers(roomId: string): User[] | ApiResponse {
    const room = this.rooms.find((r) => r.roomId === roomId);
    if (!room) {
      return new ApiResponse(404, "Room not found");
    }
    return room.getUsers();
  }
}

export default RoomHandler.getInstance();
