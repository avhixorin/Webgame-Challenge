import { roomData } from "../../types/user"
const handleJoining = (data:roomData) => {
    console.log("The room id is: ",data.roomId,)
    console.log("The rooom password is: ",data.roomPassword)
}

export default handleJoining