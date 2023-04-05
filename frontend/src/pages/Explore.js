import BlogSummary from "../components/blogSummary";
import { blogsList } from "../logic/objectSamples";
import '../styles/pages/Explore.css';

import React from "react";
const Explore = () => {
        console.log("App explore");
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

export default React.memo(Explore);
