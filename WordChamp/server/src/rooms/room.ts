import { User } from "../types/user";

class Room {
  private users: User[] = [];

  constructor(public roomId: string, public roomPassword: string) {}

  addUser(user: User): string | void {
    if (this.users.length >= 3) return "Room is full. Cannot add more participants.";
    this.users.push(user);
  }

  validatePassword(password: string): boolean {
    return this.roomPassword === password;
  }

  getUsers(): User[] {
    return this.users;
  }

  isUserInRoom(userId: string): boolean {
    return this.users.some(user => user.id === userId);
  }
}

export default Room;
