import BlogSummary from "../components/blogSummary";
import {blog, writer} from "../logic/objectSamples";

const Explore = () => {
    return <div className="Explore flexCenter">
        {(() => {
                        let td = [];
            for (let i = 0; i < 6; i++) {
                td.push(<BlogSummary key={i} writer={writer}  blog={blog} />)

            }return td
    })() }
    </div>;
};

export default Explore;
