import http from "http";
// import socket service 
import SocketService from "./services/socket";

async function init() {
  const httpServer = await http.createServer();

  // initializing the socket server 
  const socketService = new SocketService();
  const PORT = process.env.PORT ? process.env.PORT : 8000;

  // attaching the server to the SocketService
  socketService.io.attach(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`http server started at ${PORT}...`);
  });

  // initialize the socket listeners
  socketService.initListeners();
}

init();
