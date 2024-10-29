import { Socket } from "socket.io";
import { OnlineUser } from "../utils/socketConnection/socketConnect";

class Room {
  public users: { user: OnlineUser; socketId: string }[] = [];

  constructor(public roomId: string, public roomPassword: string) {}

  // Add a user to the room and make the socket join the room
  addUser(user: OnlineUser, socket: Socket): string {
    if (this.users.length >= 3) {
      return "Room is full";
    }

    // Make the socket join the room
    socket.join(this.roomId);

    // Add the user to the users list with their socket ID
    this.users.push({ user, socketId: socket.id });

    return "User added to room";
  }

  // Remove a user by their socket ID
  removeUser(socketId: string): string {
    const initialLength = this.users.length;
    this.users = this.users.filter(u => u.socketId !== socketId);
    return initialLength === this.users.length ? "User not found" : "User removed from room";
  }

  // Check if a user with a specific ID is in the room
  isUserInRoom(userId: string): boolean {
    return this.users.some(({ user }) => user.userId === userId);
  }

  // Validate room password
  validatePassword(password: string): boolean {
    return this.roomPassword === password;
  }

  // Get socket IDs of all users except the one with provided socket ID
  getOtherSocketIds(excludeSocketId: string): string[] {
    return this.users
      .filter(({ socketId }) => socketId !== excludeSocketId)
      .map(({ socketId }) => socketId);
  }
}

export default Room;
