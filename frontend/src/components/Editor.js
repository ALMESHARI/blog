import { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "highlight.js/styles/monokai-sublime.css";
import "../styles/components/Editor.css";
import hljs from "highlight.js";
import React from "react";
import uploadImage from "../services/uploadImage";

const CustomDiv = Quill.import("blots/block/embed");

// to allow adding a div image placeholder into the editor
class DivBlot extends CustomDiv {
    static blotName = "div";
    static tagName = "div";
    static defaultClassName = "image-placeholder";
    static defaultContent = `<div class="loader"></div>`;

    static create(value) {
        const node = super.create(value);
        node.setAttribute("class", this.defaultClassName);
        node.innerHTML = this.defaultContent;
        return node;
    }

    static value(node) {
        return {
            class: node.getAttribute("class"),
        };
    }
}
Quill.register(DivBlot);

function handleDeleteDivs(url) {
    const quill = quillRef.current.getEditor();
    const div = quill.container.querySelector(".image-placeholder");
    if (!div) return;
    let blot = Quill.find(div);

    const index = quill.getIndex(blot);
    quill.deleteText(index, 1);
    quill.insertEmbed(index, "image", url);
    quill.setSelection(index + 1);
}

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
        let range = quill.getSelection();
        let delta = quill.insertEmbed(
            range.index,
            "div",
            "<div>hellow eold</div>",
            Quill.sources.USER
        );

        quill.setSelection(range.index + 1);

        return await uploadImage(
            formData,
            setError,
            setLoading,
            "/api/images/upload/content"
        )
            .then((url) => {
                // remove the placeholder div and insert the uploaded image
                handleDeleteDivs(url);
            })
            .catch((error) => {
                // remove the placeholder div and show an error message
                handleDeleteDivs();
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
let [error, setError] = [null, null];
let [loading, setLoading] = [null, null];

const Editor = () => {
    const [content, setContent] = useState("");
    [error, setError] = useState("");
    [loading, setLoading] = useState(false);
    console.log(content);

    quillRef = React.useRef(null);

    return (
        <div className="editor-container">
            <div className="editor-status">
                {error && <div className="error">{error}</div>}
                {loading && (
                    <div className="loading-indicator">
                        <p className="upload-message">Uploading content</p>
                        <div className="loader"></div>
                    </div>
                )}
            </div>
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
