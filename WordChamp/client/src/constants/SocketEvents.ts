export const SOCKET_EVENTS = {
    // Connection events
    CONNECT: "connect",
    DISCONNECT: "disconnect",

    // User actions
    REGISTER: "register",
    CREATE_ROOM: "createRoom",
    JOIN_ROOM: "joinRoom",
    LEAVE_ROOM: "leaveRoom",
    SEND_MESSAGE: "sendMessage",
    USER_TYPING: "userTyping",
    USER_STOPPED_TYPING: "userStoppedTyping",
    ANNOUNCE: "announce",

    // Server responses
    HOSTING_RESPONSE: "hostingResponse",
    JOINING_RESPONSE: "joiningResponse",
    REGISTRATION_RESPONSE: "registrationResponse",
    CREATE_ROOM_RESPONSE: "createRoomResponse",
    ENQUIRY_RESPONSE: "enquiryResponse",
    MESSAGE_RECEIVE: "messageReceive",

    // Room status updates
    ROOM_FULL: "roomFullStatus",
    ERROR: "serverError",
} as const;
