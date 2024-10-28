import { roomData } from "../../types/user";
import ApiResponse from "../ApiResponse/ApiResponse";

class RoomHandler {
    private rooms: roomData[] = [];

    public handleRequest(type: 'hostRoom' | 'joinRoom', room: roomData, userId: string, password?: string): ApiResponse {
        if (type === 'hostRoom') {
            this.rooms.push(room);
            return new ApiResponse(200,'Room hosted successfully');
        } else if (type === 'joinRoom') {
            const foundRoom = this.rooms.find(r => r.roomId === room.roomId);
            if (!foundRoom) {
                return new ApiResponse(404,'Room not found');
            }
            if (foundRoom.roomPassword !== password) {
                return new ApiResponse(401,'Wrong password for the room')
            }
            foundRoom.users.push(userId);
            return new ApiResponse(200,'Joined room successfully')
        }
        return new ApiResponse(400,'Invalid request type');
    }
}

export default RoomHandler;