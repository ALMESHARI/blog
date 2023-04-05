import Editor from "../components/Editor";
import { getDate } from "../logic/date";
import { useState } from "react";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ImageUpload from "../components/imageUploader";
import "../styles/pages/WriteNew.css";

const WriteNew = ({ writer }) => {
    const date = getDate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [error, setError] = useState("no error");
    const [loading, setLoading] = useState(false);


    const inputHandler = (e,hook) => {
        hook(e.target.value)
        console.log(e.target.value)
    }
    return (
        <div className="WriteNew">
            <div className="micro-writer">
                <img
                    className="writer-picture"
                    src={writer.picture}
                    alt={writer.name}
                />
                <div className="writer-divider">
                    <h5 className="writer-name">{writer.name}</h5>
                    <div className="blog-information">
                        <h5 className="blog-date">{`${date.month} ${date.day}`}</h5>
                        <input
                            id="tags-input"
                            className="gb-input-style"
                            type="text"
                            placeholder="insert tags e.g #tag1 #tag2"
                            onChange={(e) => inputHandler(e, setTags)}
                        />
                    </div>
                </div>
            </div>
            <input
                id="title-input"
                className="gb-input-style"
                type="text"
                placeholder="Title with no more than 60 characters"
                onChange={(e) => inputHandler(e, setTitle)}
                maxLength={60}
            />

            <textarea
                maxLength={160}
                id={"description-input"}
                className={"gb-input-style"}
                type="text"
                placeholder="Description with no more than 160 characters"
                onChange={(e) => inputHandler(e, setDescription)}
            />

            <ImageUpload />

            <Editor />

            <div
                className="writenew-buttons"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
            >
                <button id="save-btn" className="gb-button-style">
                    SAVE
                    <ArrowForwardIosOutlinedIcon />
                </button>
                <button id="publish-btn" className="gb-button-style">
                    SAVE & PUBLISH
                    <ArrowForwardIosOutlinedIcon />
                </button>
            </div>
        </div>
    );
};






 

export default WriteNew;
