import React, { useEffect } from 'react'
import Quill from "quill"
import "quill/dist/quill.snow.css";


const TextEditor = () => {

    useEffect(() => {
        const quill = new Quill('#container', {
            theme: 'snow',
            modules: {
                toolbar: true
            },
            placeholder: 'Type here...'
        })
    }, [])

    return (
        <div id='container'></div>
    )
}

export default TextEditor