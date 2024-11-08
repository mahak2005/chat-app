// src/services/socket.ts
import { Server } from "socket.io";

class SocketService {
    // Create a variable _io with type Server from socket.io
    private _io: Server;

    constructor() {
        // Log a message when the SocketService is initialized
        console.log("init socket server");

        // Setup CORS policy to allow all ('*')
        this._io = new Server({
            cors: {
                origin: "*",  // Allow any origin
                allowedHeaders: ["*"],  // Allow any headers
            },
        });
    }

    // Initialize event listeners for the socket connection
    public initListeners() {
        const io = this._io;

        // Event listener for when a client connects to the WebSocket server
        io.on("connect", async (socket) => {
            console.log(`⚡ userId ${socket.id} connected`);

            // Event listener for when the socket receives a message
            socket.on("event:message", (msg) => {
                console.log("message received", msg);
                // Emit the received message to all connected clients
                io.emit("message", JSON.stringify(msg));
            });

            // Log a message when socket user is disconnected
            socket.on("disconnect", () => {
                console.log(`🚫 userId ${socket.id} disconnected`);
            });
        });
    }

    // Getter method to access the _io instance from outside the class
    get io() {
        return this._io;
    }
}

// Export the SocketService class as the default export of this module
export default SocketService;
