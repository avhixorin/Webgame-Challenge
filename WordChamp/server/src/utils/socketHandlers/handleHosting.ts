import Room from "../../rooms/room"
import { roomData, User } from "../../types/user"
import ApiResponse from "../ApiResponse/ApiResponse"
const handleHosting = (data:roomData,user:User) => {
    let newRoom = new Room(data.roomId,data.roomPassword)
    newRoom.addUser(user),
    console.log(`${user.username} is hosting a room with password as ${newRoom.getPassword()}`)
    return new ApiResponse(200,"Room hosted successfully",newRoom)
}

export default handleHosting