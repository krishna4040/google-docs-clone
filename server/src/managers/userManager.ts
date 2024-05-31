import { Server, Socket } from "socket.io";

type User = Socket
type RoomId = string
type channel = Server

export const roomMap = new Map<RoomId, User[]>()

export class UserManager {
    private socket
    private io

    constructor(socket: Socket, io: channel) {
        this.socket = socket
        this.io = io
    }

    createRoom(roomId: RoomId) {
        roomMap.set(roomId, [this.socket])
        this.socket.join(roomId)
        this.io.in(roomId).emit('room-created', roomId)
    }
    enterRoom(roomId: RoomId) {
        const room = roomMap.get(roomId)
        if (room) {
            this.socket.join(roomId)
            roomMap.set(roomId, [...room, this.socket])
            this.io.in(roomId).emit('room-entered', roomId)
        }
        this.socket.emit('invalid-roomId', roomId)
    }
    exitRoom(roomId: RoomId) {
        const room = roomMap.get(roomId)
        if (room) {
            this.socket.leave(roomId)
            const newRoom = room.filter(user => user !== this.socket)
            roomMap.set(roomId, newRoom)
            this.io.in(roomId).emit('room-exited', roomId)
        }
        this.socket.emit('invalid-roomId', roomId)
    }
}