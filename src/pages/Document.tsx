import { useParams } from "react-router-dom"
import TextEditor from "../components/TextEditor"

const Document = () => {

    const {id}  = useParams()

    return (
        <div>
            <TextEditor />
        </div>
    )
}

export default Document