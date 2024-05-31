import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { useSocket } from '../context/SocketProvider'

const Home = () => {
  const [isJoining, setIsJoining] = useState<boolean>(false)
  const [roomId, setRoomId] = useState<string>('')
  const [isValidRoomId, setIsValidRoomId] = useState<boolean>(true)
  const navigate = useNavigate()
  const socket = useSocket()

  const createRoomHandler = () => {
    setIsJoining(false)
    const roomId = v4()
    setRoomId(roomId)
    socket.emit('create-room', roomId)
  }

  const enterRoomHandler = () => {
    socket.emit('enter-room', roomId)
  }

  useEffect(() => {
    socket.on('room-entered', (room: string) => {
      setRoomId(room)
      setIsValidRoomId(true)
      navigate(`/documents/${room}`)
    })
    socket.on('room-created', (room: string) => navigate(`/documents/${room}`))
    socket.on('invalid-room', (_: string) => setIsValidRoomId(false))

    return () => {
      socket.off('room-entered')
      socket.off('invalid-room')
      socket.off('room-created')
      setIsJoining(false)
      setRoomId('')
      setIsValidRoomId(true)
    }
  }, [])

  return (
    <div className='flex flex-col items-center justify-center gap-5 border w-screen h-screen bg-[#f3f3f3]'>
      <div className='flex items-center justify-center gap-5'>
        <button className='px-3 py-2 rounded-md bg-yellow-400 text-black hover:scale-95 transition-all duration-200 font-serif' onClick={createRoomHandler}>Create Room</button>
        <button className='px-3 py-2 rounded-md bg-yellow-400 text-black hover:scale-95 transition-all duration-200 font-serif' onClick={() => setIsJoining(true)}>Join room</button>
      </div>
      {
        isJoining &&
        <div className='flex flex-col items-center justify-center gap-2'>
          <label htmlFor="Username" className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <input
              type="text"
              id="roomId"
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 py-2 px-4"
              placeholder="roomId"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-[#f3f3f3] p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              Room
            </span>
          </label>
          <button className='py-2 px-3 w-full rounded-md bg-slate-950 text-white hover:scale-95 duration-200 transition-all' onClick={enterRoomHandler}>Enter Room</button>
          {
            !isValidRoomId && <span className='text-pink-900 text-xs'>Please Enter a valid Room id</span>
          }
        </div>
      }
    </div>
  )
}

export default Home