const BlogSummary = ({ writer, blog }) => {
    return (
        <div className="blog-summary">
            <div className="blog-review">
                <div className="micro-writer">
                    <img
                        className="writer-picture"
                        src={writer.picture}
                        alt={writer.name}
                    />
                    <h5 className="writer-name">{writer.name}</h5>
                </div>
                <h2 className="blog-title">{blog.title}</h2>
                <h4 className="blog-description">{blog.description}</h4>
                <div className="blog-information">
                    <h5 className="blog-date">{blog.date}</h5>
                    <h5 className="blog-tag">{blog.tag}</h5>
                    <h5 className="blog-minutes">{blog.minutes}</h5>
                </div>
            </div>
            <div className="blog-picture">
                <img src={blog.picture} alt="" />
            </div>
        </div>
    );
};

export default BlogSummary;
