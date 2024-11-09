export const SOCKET_EVENTS = {
    // Connection events
    CONNECT: "connect",
    DISCONNECT: "disconnect",

    // User actions
    START_GAME: "startGame",
    REGISTER: "register",
    HOST_ROOM: "hostRoom",
    JOIN_ROOM: "joinRoom",
    LEAVE_ROOM: "leaveRoom",
    SOMEONE_JOINED: "someoneJoined",
    ANNOUNCE: "announce",
    NO_OF_USERS: "noOfUsers",
    NEW_MESSAGE: "newMessage",
    NEW_USER: "newUser",
    MESSAGE_SEND: "messageSend",
    MESSAGE_RECEIVE: "messageReceive",
    USER_TYPING: "userTyping",
    USER_STOPPED_TYPING: "userStoppedTyping",

    // Server responses
    HOSTING_RESPONSE: "hostingResponse",
    JOINING_RESPONSE: "joiningResponse",
    REGISTRATION_RESPONSE: "registrationResponse",
    CREATE_ROOM_RESPONSE: "createRoomResponse",
    ENQUIRY_RESPONSE: "enquiryResponse",

    // Room status updates
    ROOM_FULL: "roomFullStatus",
    ERROR: "serverError",
} as const;
