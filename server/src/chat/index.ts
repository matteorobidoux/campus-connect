import { Server } from "socket.io";
import http from "http";
import { UserClassSection } from "../../../types/UserClassSection";

export function createServer(server: http.Server) {
  const io = new Server(server);
  io.on('connection', (socket) => {
    socket.on('message', (payload: {room: UserClassSection}) => {
      socket.to(JSON.stringify(payload.room)).emit("message", payload);
    });

    socket.on('setRoom', (courses: UserClassSection[]) => {
      courses.forEach(course => socket.join(JSON.stringify(course)));
    });
  })

}

