import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../services/useFetch";

function Blog(writer) {
    const { id } = useParams();
    const { data: blog, error, isLoading } = useFetch(`/api/blogs/blog/${id}`);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div className="Blog">
            {/* writer section */}
            <div className="micro-writer">
                <img
                    className="writer-picture"
                    src={writer.picture}
                    alt={writer.name}
                />
                <div className="writer-divider">
                    <h5 className="writer-name">{writer.name}</h5>
                    <div className="blog-information">
                        <h5 className="blog-date">{`${blog.publishDate.month} ${blog.publishDate.day}`}</h5>
                        <h5 className="blog-tag">{blog.tag}</h5>
                    </div>
                </div>
            </div>
            {/* blog header section */}
            <div className="ql-snow">
                <h2 className="blog-title">{blog.title}</h2>
                <img src={blog.mainImage} alt="image" />
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
