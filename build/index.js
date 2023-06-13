"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.server = exports.io = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const server = http_1.default.createServer(app);
exports.server = server;
const socket_io_1 = require("socket.io");
const soketport = process.env.SocketPort || 'http://localhost:4000';
const io = new socket_io_1.Server(server, {
    cors: {
        origin: soketport
    }
});
exports.io = io;
io.on("connection", (socket) => {
    console.log("user connected with id:", socket.id);
    socket.on("WS", (arg) => {
        io.emit('WSC', arg);
        console.log(arg);
    });
    socket.on("ready", (arg) => {
        io.emit('readyC', arg);
        console.log(arg);
    });
});
const port = process.env.PORT || 4000;
// io.on('WS',(msg)=>{
//     console.log(msg);
// io.emit('WSC',msg)
// })
// settins
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// variable port
app.set("port", port);
// router
app.get('/', (req, res) => {
    res.send('ok');
});
