import "../styles/components/blogSummary.css";
import { toFormattedDate } from "../logic/date";
import { useNavigate } from "react-router-dom";



const BlogSummary = ({ writer, blog }) => {
    const navigate = useNavigate();

    return (
        <div className="blog-summary">
            <div className="blog-review">
                <div className="micro-writer">
                    <img
                        className="writer-picture"
                        src={writer.avatar}
                        alt={writer.firstName}
                    />
                    <h5 className="writer-name">
                        {writer.firstName} {writer.lastName}
                    </h5>
                </div>
                <div className="blog-title-div">
                    <h2
                        className="blog-title"
                        onClick={() => {
                            navigate(`/Blog/${blog._id}`);
                        }}
                    >
                        {blog.title}{" "}
                    </h2>
                </div>
                <h4 className="blog-description">{blog.description}</h4>
                <div className="blog-information">
                    <h5 className="blog-date">
                        {toFormattedDate(blog.publishDate)}
                    </h5>
                    <h5 className="blog-tag">{blog.tag}</h5>
                    <h5 className="blog-minutes">{blog.minutes} min read</h5>
                </div>
            </div>
            <div className="blog-picture">
                <img
                    src={blog.mainImage}
                    alt=""
                    onClick={() => {
                        navigate(`/Blog/${blog._id}`);
                    }}
                />
            </div>
        </div>
    );
};

export default BlogSummary;
