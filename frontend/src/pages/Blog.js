import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "../styles/pages/Blog.css";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../services/useFetch";
import { toFormattedDate } from "../logic/date";

function Blog() {
    const { id } = useParams();
    const { data, error, isLoading } = useFetch(`/api/blogs/blog/${id}`);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    const { blog, writer } = { ...data };
    return (
        <div className="Blog">
            {/* writer section */}
            {/* those styles can be found in blog summary */}
            <div className="micro-writer">
                <img
                    className="writer-picture"
                    src={writer.avatar}
                    alt={writer.firstName}
                />
                <div className="writer-divider">
                    <h5 className="writer-name">
                        {writer.firstName} {writer.lastName}
                    </h5>
                    <div className="blog-information">
                        <h5 className="blog-date">
                            {toFormattedDate(blog.publishDate)}
                        </h5>
                        <h5 className="blog-minutes">{blog.minutes} min read </h5>
                        <h5 className="blog-tag">{blog.tag}</h5>
                    </div>
                </div>
            </div>
            {/* blog header section */}
            <div className="ql-snow">
                <h1 className="">{blog.title}</h1>
                <h4 className="blog-description">{blog.description}</h4>

                <img className="main-image" src={blog.mainImage} alt="image" />
                <div className="ql-snow"></div>

                {/* blog body section */}
                <div
                    className="blog-content ql-editor"
                    dangerouslySetInnerHTML={{ __html: blog.body }}
                ></div>
            </div>

            {/* Read more section */}
            <div className="read-more">
                <h3>Read more</h3>
                <div className="read-more-blogs"></div>
            </div>
        </div>
    );
}


export default Blog;
