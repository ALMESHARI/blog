import BlogSummary from "../components/blogSummary";

const writer = {
    name: "Ridha almeshari",
    picture: "https://i.ytimg.com/vi/rRZ-IxZ46ng/sddefault.jpg",
};

const blog = {
    blogTitle: "operating systems",
    blogDescription: "this is a blog about operating systems",
    blogPicture:
        "https://www.softwaretestinghelp.com/wp-content/qa/uploads/2019/09/OPerating-Systems-list.png",
};

const Explore = () => {
    return <div className="Explore flexCenter">
        <BlogSummary writer={writer}  blog={blog} />
    </div>;
};

export default Explore;
