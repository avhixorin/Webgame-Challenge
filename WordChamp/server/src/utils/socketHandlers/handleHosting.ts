type Data = {
    roomId: string,
    roomPassword:string
}
const handleHosting = (data:Data) => {
    console.log("The room id is: ",data.roomId,)
    console.log("The rooom password is: ",data.roomPassword)
}

export default handleHosting