import { useParams } from "react-router-dom"
import TextEditor from "../components/TextEditor"
import {FaCopy} from 'react-icons/fa'

const Document = () => {
    const {roomId= ''}  = useParams()

    return (
        <div className="w-screen h-screen bg-[#f3f3f3]">
            <div className="flex items-center justify-start gap-3">
                <h1 className="text-xl font-bold">Room-ID:</h1>
                <span>{roomId}</span>
                <span><FaCopy onClick={() => navigator.clipboard.writeText(roomId)} className="cursor-pointer text-xl hover:scale-95 duration-200 transition-all" /></span>
            </div>
            <TextEditor />
        </div>
    )
}

export default Document