import BlogSummary from "../components/blogSummary";
// import { blogsList } from "../logic/objectSamples";
import useFetch from "../services/useFetch";
import "../styles/pages/Explore.css";

import React from "react";
const Explore = () => {
    const { data, error, isLoading } = useFetch(`/api/blogs/`);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    let blogsList = data.blogs;
    return (
        <div className="Explore">
            <div className="blogs">
                {blogsList.map((blog, i) => {
                    return (
                        <BlogSummary key={i} writer={blog.writerID} blog={blog} />
                    );
                })}
                {/* {blogsList.map((blog, i) => {
                    return (
                        <BlogSummary key={i} writer={blog.writer} blog={blog} />
                    );
                })} */}
            </div>
            <div className="side-div">
                <h2>side div</h2>
            </div>
        </div>
    );
};

export default React.memo(Explore);
