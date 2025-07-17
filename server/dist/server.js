"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: [process.env.REACT_APP_URL || ""],
    credentials: true,
}));
app.get("/", (req, res) => {
    res.send("Welcome to Chatt API Server");
});
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.REACT_APP_URL || "",
    },
});
let onlineUser = {};
let messages = [];
exports.io.on("connection", (socket) => {
    let currentUserName = "";
    socket.on("person", (user) => {
        currentUserName = user.name;
        onlineUser = Object.assign(Object.assign({}, onlineUser), { [user.name]: socket.id });
        exports.io.emit("getOnlineUsers", Object.keys(onlineUser));
        exports.io.emit("allmessages", messages);
    });
    socket.on("msgsend", (msgObj) => {
        messages.push(msgObj);
        exports.io.emit("allmessages", messages);
    });
    socket.on("disconnect", () => {
        delete onlineUser[currentUserName];
        exports.io.emit("getOnlineUsers", Object.keys(onlineUser));
    });
});
const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
