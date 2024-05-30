import React, { useEffect, useState } from 'react'
import Quill from "quill"
import "quill/dist/quill.snow.css";
import { TOOLBAR_OPTIONS } from '../constants/toolbar-options';
import { useSocket } from '../context/SocketProvider';
import { Delta, EmitterSource } from 'quill/core';


const TextEditor = () => {

    const socket = useSocket()
    const [quill, setQuill] = useState<Quill | null>(null)

    const textChangeHandler = (delta: Delta, _: Delta, source: EmitterSource) => {
        if (source !== 'user') {
            return
        }
        socket.emit('send-changes', delta)
    }

    useEffect(() => {
        const quill = new Quill('#container', {
            theme: 'snow',
            modules: {
                toolbar: TOOLBAR_OPTIONS
            },
            placeholder: 'Type here...'
        })
        setQuill(quill)

        return () => {
            setQuill(null)
        }
    }, [])

    useEffect(() => {
        if (!quill) return
        quill.on('text-change', textChangeHandler)

        return () => {
            quill.off('text-change', textChangeHandler)
        }
    }, [quill, socket])

    return (
        <div id='container'></div>
    )
}

export default TextEditor