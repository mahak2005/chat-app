"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/socket.ts
const socket_io_1 = require("socket.io");
class SocketService {
    constructor() {
        // Log a message when the SocketService is initialized
        console.log("init socket server");
        // Setup CORS policy to allow all ('*')
        this._io = new socket_io_1.Server({
            cors: {
                origin: "*", // Allow any origin
                allowedHeaders: ["*"], // Allow any headers
            },
        });
    }
    // Initialize event listeners for the socket connection
    initListeners() {
        const io = this._io;
        // Event listener for when a client connects to the WebSocket server
        io.on("connect", (socket) => __awaiter(this, void 0, void 0, function* () {
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
        }));
    }
    // Getter method to access the _io instance from outside the class
    get io() {
        return this._io;
    }
}
// Export the SocketService class as the default export of this module
exports.default = SocketService;
