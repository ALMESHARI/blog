import Editor from "../components/Editor";
import { getDate } from "../logic/date";
import { useState } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ImageUpload from "../components/imageUploader";
import "../styles/pages/WriteNew.css";
import uploadBlog from "../services/uploadBlog";

const WriteNew = ({ writer }) => {
    const date = getDate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mainImageURL, setMainImageURL] = useState(null);

    const inputHandler = (e, hook) => {
        hook(e.target.value);
        console.log(e.target.value);
    };
    console.log(content);

    if (error) {
        notifyError(error);
    }

    const notifyError = (error) => {
        alert(error);
    };

    console.log("render");

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
                            placeholder="insert tag"
                            onChange={(e) => inputHandler(e, setTag)}
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

            <ImageUpload
                setMainImageURL={setMainImageURL}
                error= {error}
                setError={setError}
                setLoading={setLoading}
            />

            <Editor setContent={setContent} />

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
                <button
                    id="publish-btn"
                    className="gb-button-style"
                    onClick={() => {
                        if (!title || !description || !content) {
                            notifyError("Please fill all the fields");
                        } else if (!mainImageURL) {
                            notifyError("Please upload a main image");
                        } else {
                            if (loading) {
                                notifyError(
                                    "Please wait for content to be uploaded"
                                );
                            } else {
                                let data = {
                                    title,
                                    description,
                                    tag,
                                    body: content,
                                    mainImage: mainImageURL,
                                    writerID: writer.id,
                                    status: "published",
                                    publishDate: new Date(),
                                };
                                let url = "api/blogs/newBlog";
                                uploadBlog({
                                    url,
                                    data,
                                    setLoading,
                                    setError,
                                });
                            }
                        }
                    }}
                >
                    SAVE & PUBLISH
                    <ArrowForwardIosOutlinedIcon />
                </button>
            </div>
        </div>
    );
};
export default WriteNew;
