const BlogSummary = ({writer,blog}) => {
    return (
        <div className="blog-summary">
            <div className="micro-writer">
                <img
                    src={writer.picture}
                    alt={writer.name}
                />
                <h5>{ writer.name }</h5>
            </div>
        </div>
    );
};

export default BlogSummary;
