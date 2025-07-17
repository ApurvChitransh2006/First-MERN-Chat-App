import "dotenv/config";
import express, { Request, Response, Application } from "express";
import morgan from "morgan";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const app: Application = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.REACT_APP_URL || ("" as string)],
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Chatt API Server");
});

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: process.env.REACT_APP_URL || ("" as string),
  },
});

type Message = {
  sender: string,
  reciever: string,
  message: string
}

let onlineUser: { [key: string]: string } = {};
let messages: Message[] = [];

io.on("connection", (socket) => {
  
  let currentUserName = "";
  socket.on("person", (user) => {
    currentUserName = user.name;
    onlineUser = { ...onlineUser, [user.name as string]: socket.id as string };
    io.emit("getOnlineUsers", Object.keys(onlineUser))
    io.emit("allmessages", messages)
  });

  socket.on("msgsend", (msgObj)=>{
    messages.push(msgObj)
    io.emit("allmessages", messages)
  })
  
  socket.on("disconnect", () => {
    delete onlineUser[currentUserName];
    io.emit("getOnlineUsers", Object.keys(onlineUser));
});


});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
