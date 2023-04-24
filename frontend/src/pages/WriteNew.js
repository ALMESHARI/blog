import { Editor, numWords } from "../components/Editor";
import { getDate } from "../logic/date";
import { useState, useContext } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ImageUpload from "../components/imageUploader";
import "../styles/pages/WriteNew.css";
import uploadData from "../services/uploadData";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../context/ModalContext";



const WriteNew = ({ writer }) => {
    const date = getDate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mainImageURL, setMainImageURL] = useState(null);
    const modalContext = useContext(ModalContext);

    
    const navigate = useNavigate();

    const inputHandler = (e, hook) => {
        hook(e.target.value);
    };

    

    const notifyError = (error) => {
        alert(error);
    };

     if (error) {
         notifyError(error);
     }


    return (
        <div className="WriteNew-wrapper">
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
                    error={error}
                    setError={setError}
                    setLoading={setLoading}
                />

                <div id="counter">Words: {numWords}</div>

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
                        onClick={async () => {
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
                                        minutes: parseInt(numWords / 250) > 0 ? parseInt(numWords / 250) : 1,
                                    };
                                    let url = "api/blogs/newBlog";
                                    setLoading(true);
                                    await uploadData({
                                        url,
                                        data,
                                        setLoading,
                                        setError,
                                        modalContext
                                    });
                                    console.log("gg", error, loading);
                                    if (!error && !loading) {
                                        navigate("/explore");
                                    }
                                }
                            }
                        }}
                    >
                        SAVE & PUBLISH
                        <ArrowForwardIosOutlinedIcon />
                    </button>
                </div>
            </div>
            <div className="side-div"></div>
        </div>
    );
};

export default WriteNew;
