import { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "highlight.js/styles/monokai-sublime.css";
import "../styles/components/Editor.css";
import hljs from "highlight.js";
import React from "react";
import uploadImage from "../services/uploadImage";

const imageHandler = async () => {
    const quill = quillRef.current.getEditor();
    const input = document.createElement("input");
    // take the image from the input
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
        const file = input.files[0];
        const formData = new FormData();

        formData.append("image", file);

        // create a temporary placeholder div for the image
        const placeholder = document.createElement("div");
        placeholder.classList.add("image-placeholder");
        // quill.root.appendChild(placeholder);
        // upload the image using the uploadFunction
        return await uploadImage(
            formData,
            null,
            null,
            "/api/images/upload/content"
        )
            .then((url) => {
                // remove the placeholder div and insert the uploaded image
                placeholder.remove();
                const range = quill.getSelection();
                quill.insertEmbed(range.index, "image", url );
                quill.setSelection(range.index + 1);
                return url;
            })
            .catch((error) => {
                // remove the placeholder div and show an error message
                placeholder.remove();
                console.error(error);
            });
    };
};

const modules = {
    syntax: {
        highlight: (text) => hljs.highlightAuto(text).value,
    },
    toolbar: {
        handlers: {
            image: imageHandler,
        },
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
let quillRef = null;

const Editor = () => {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    quillRef = React.useRef(null);

    return (
        <div className="editor-container">
            <div className="editor-status"></div>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                onChange={setContent}
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
