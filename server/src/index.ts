import { Socket, Server } from "socket.io";
import express, { Request, Response } from 'express'
import { createServer } from 'http'
import { config } from 'dotenv'
import { UserManager, roomMap } from "./managers/userManager";

config()
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        credentials: true
    }
});

io.on('connection', (socket: Socket) => {
    const user = new UserManager(socket, io)
    socket.on('create-room', (roomId: string) => user.createRoom(roomId))
    socket.on('enter-room', (roomId: string) => user.enterRoom(roomId))
    socket.on('exit-room', (roomId: string) => user.exitRoom(roomId))
});

app.use(express.json());

httpServer.listen(process.env.PORT, () => console.log(`app listening successfully on ${process.env.PORT}`));
app.get('/', (req: Request, res: Response) => res.send('<h1>Home page for api</h1>'))