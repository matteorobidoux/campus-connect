import { Server } from "socket.io";
import http from "http";
import { UserClassSection } from "../../../types/UserClassSection";
import DbMongoose from "../db/db";
export function createServer(server: http.Server) {
  let info: { room: UserClassSection } | null = null;
  const io = new Server(server);
  io.on("connection", (socket) => {
    socket.on("message", (payload) => {
      info = payload;
      socket.to(JSON.stringify(payload.room)).emit("message", payload);
      DbMongoose.addMessage({
        room: payload.room,
        message: {
          message: payload.message,
          user: { userName: payload.user.userName, _id: payload.user._id },
          date: payload.date,
        },
      });
    });

    socket.on("setRoom", (courses: UserClassSection[]) => {
      courses.forEach((course) => socket.join(JSON.stringify(course)));
    });
  });
}
