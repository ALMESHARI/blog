import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "highlight.js/styles/monokai-sublime.css";
import "../styles/components/Editor.css";

import hljs from "highlight.js";
// import "highlight.js"
import React from "react";




const modules = {
    syntax: {
        highlight: (text) => hljs.highlightAuto(text).value,
    },
    toolbar: {
        container: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"],
        ],
        shouldUpdate: () => false, // toolbar should not be re-rendered again and again when the content changes
    },
};
hljs.configure({
    // optionally configure hljs
    languages: ["javascript", "ruby", "python"],
});

const Editor = () => {
    const [value, setValue] = useState("");
    const content = ``;
    console.log("editor")

    return (
        <div className="editor-container">
            <ReactQuill
                theme="snow"
                onChange={setValue}
                placeholder="Content goes here..."
                bounds={`.editor-container`}
                modules={modules}
                sticky_toolbar={true}

                // readOnly={true}
                // value={content}
            />
        </div>
    );
};

export default Editor;
