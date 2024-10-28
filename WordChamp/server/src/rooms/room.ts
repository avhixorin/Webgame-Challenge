import { User } from "../types/user";

class Room {
  private users: User[] = [];
  private maxParticipants: number = 3;

  constructor(public roomId: string, public roomPassword: string) {}

  addUser(user: User): string {
    if (this.users.length >= this.maxParticipants) {
      return "Room is full. Cannot add more participants.";
    }
    this.users.push(user);
    return "User added successfully";
  }

  removeUser(userId: string): void {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  getUsers(): User[] {
    return this.users;
  }
  getPassword(): string {
    return this.roomPassword
  }
  validatePassword(password: string): boolean {
    return this.roomPassword === password;
  }
}

export default Room;
