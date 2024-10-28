import { User } from "../types/user";
import ApiResponse from "../utils/ApiResponse/ApiResponse";

class Room {
  private users: User[] = [];
  private maxParticipants: number = 3;

  constructor(public roomId: string, public password: string) {}

  addUser(user: User): ApiResponse {
    if (this.users.length >= this.maxParticipants) {
      return new ApiResponse(500,"Room is full. Cannot add more participants.");
    }
    this.users.push(user);
    return new ApiResponse(200,`${user.username} has joined the room.`);
  }

  removeUser(userId: string): void {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  getUsers(): User[] {
    return this.users;
  }

  getRoomId(): string {
    return this.roomId;
  }

  getPassword(): string {
    return this.password;
  }
}

export default Room