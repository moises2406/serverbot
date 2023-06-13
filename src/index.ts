import { config } from "dotenv";
config();
import express from "express";
const app = express();
import http from "http";
import cors from "cors";
const server = http.createServer(app);
import { Server } from "socket.io";
const soketport = process.env.SocketPort || 'http://localhost:4000';

const io = new Server(server,{
    cors: {
        origin: soketport
    }
});

io.on("connection", (socket) => {
    console.log("user connected with id:", socket.id);
  
    socket.on("WS",(arg) =>{
        io.emit('WSC',arg)
        console.log(arg);
    })
    socket.on("ready",(arg) =>{
        io.emit('readyC',arg)
        console.log(arg);
    })
});

const port = process.env.PORT || 4000;

// io.on('WS',(msg)=>{
//     console.log(msg);
// io.emit('WSC',msg)
// })
// settins
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// variable port
app.set("port", port);

// router
app.get('/',(req,res)=>{
    res.send('ok')
})

export { io, server, app };
