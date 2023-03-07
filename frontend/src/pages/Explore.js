import BlogSummary from "../components/blogSummary";
import {blogsList} from "../logic/objectSamples";

const Explore = () => {
    return (
        <div className="Explore flexCenter">
            {blogsList.map((blog, i) => {
                return <BlogSummary key={i} writer={blog.writer} blog={blog} />;
            })}
            {blogsList.map((blog, i) => {
                return <BlogSummary key={i} writer={blog.writer} blog={blog} />;
            })}
        </div>
    );
};

export default Explore;
