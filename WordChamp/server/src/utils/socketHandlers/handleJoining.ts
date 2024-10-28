import Room from "../../rooms/room";
import { User } from "../../types/user";
import roomHandlerInstance from "./handleAllRooms";
import ApiResponse from "../ApiResponse/ApiResponse";

const handleJoining = (data: Room, user: User): ApiResponse => {
    console.log(`The user ${user.username} is requesting to join room with ID ${data.roomId} and provided password.`);

    // Use the singleton instance of RoomHandler to get the room
    const room = roomHandlerInstance.getRoomById(data.roomId);

    if (!room) {
        console.log(`Room with ID ${data.roomId} not found.`);
        return new ApiResponse(404, 'Room not found');
    }

    if (!room.validatePassword(data.roomPassword)) {
        console.log(`Incorrect password for room with ID ${data.roomId}.`);
        return new ApiResponse(401, 'Incorrect password');
    }

    if (room.getUsers().length >= 3) {
        console.log(`Room with ID ${data.roomId} is full.`);
        return new ApiResponse(403, 'Room is full');
    }

    room.addUser(user);
    console.log(`User ${user.username} has successfully joined room with ID ${data.roomId}.`);

    return new ApiResponse(200, 'Joined room successfully');
};

export default handleJoining;
