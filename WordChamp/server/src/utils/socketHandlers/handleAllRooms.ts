import Room from "../../rooms/room";
import { UserData } from "../../types/Types";
import ApiResponse from "../ApiResponse/ApiResponse";
import { Socket } from "socket.io";

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

  public addRoom(room: Room): ApiResponse {
    this.rooms.push(room);
    return new ApiResponse(200, "Room created successfully");
  }

  // Method to handle hosting a new room and joining the socket to the room
  public hostRoom(room: Room, user: UserData, socket: Socket): ApiResponse {
    const newRoom = new Room(room.roomId, room.roomPassword);

    // Add user to the room and make socket join the room
    newRoom.addUser(user, socket);
    this.addRoom(newRoom);

    // Include the user count in the response
    return new ApiResponse(200, "Room hosted successfully", {
      userCount: newRoom.users.length,
    });
  }

  // Method to handle joining an existing room and joining the socket to the room
  public joinRoom(roomId: string, roomPassword: string, user: UserData, socket: Socket): ApiResponse {
    const room = this.rooms.find((r) => r.roomId === roomId);

    if (!room) {
      return new ApiResponse(404, "Room not found");
    }

    if (!room.validatePassword(roomPassword)) {
      return new ApiResponse(401, "Incorrect password");
    }

    if (room.users.length >= 3) {
      return new ApiResponse(403, "Room is full");
    }

    // Add user to the room and make socket join the room
    room.addUser(user, socket);

    // Include the user count in the response
    return new ApiResponse(200, "Joined room successfully", {
      userCount: room.users.length,
    });
  }

  public getRoomById(roomId: string): Room | undefined {
    return this.rooms.find((room) => room.roomId === roomId);
  }
}

export default RoomHandler.getInstance();
