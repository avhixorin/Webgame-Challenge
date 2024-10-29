import Room from "../../rooms/room";
import { User } from "../../types/Types";
import ApiResponse from "../ApiResponse/ApiResponse";
import roomHandlerInstance from "./handleAllRooms";

const handleHosting = (data: Room, user: User): ApiResponse => {
    const newRoom = new Room(data.roomId, data.roomPassword);
    newRoom.addUser(user);
    console.log(`${user.username} is hosting a room with password as ${newRoom.roomPassword}`);
    
    const response = roomHandlerInstance.handleRequest("hostRoom", { roomId: data.roomId, roomPassword: data.roomPassword }, user);

    if (response.statusCode === 200) {
        return new ApiResponse(200, "Room hosted successfully", newRoom);
    } else {
        return response; 
    }
};

export default handleHosting;
