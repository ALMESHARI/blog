import Blog from "../models/blogModel.js";
import Tag from "../models/tagsModel.js";

// create a new blog
const createBlog = async (req, res) => {
    const { title, description, body, writerID, tag } = req.body;
    try {
        const blog = await Blog.create({
            title,
            description,
            body,
            tag,
            writerID,
        });
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// return all the blogs
const returnBlogsByDate = async (req, res) => {
    const blogs = await Blog.find({ status: "published" }).sort({
        publishDate: -1,
    });
    if (!blogs) {
        res.status(404).json({ error: "There is no blog yet" });
    }
    res.status(200).json(blogs);
};

// return blogs by tag
const returnBlogsByTag = async (req, res) => {
    const blogs = await Blog.find({
        status: "published",
        tag: req.params.tagName,
    }).sort({ publishDate: -1 });
    if (blogs.length == 0) {
        res.status(404).json({
            error: `There is no blogs in this tag ${req.params.tagName}`,
        });
    } else {
        res.status(200).json(blogs);
    }
};

// return tag names
const returnTagNames = async (req, res) => {
    const tags = await Tag.find({});
    if (tags.length == 0) {
        res.status(404).json({ error: "There is no blog yet" });
    }
    res.status(200).json(tags);
};

const createNewTag = async (req, res) => {
    try {
        console.log('hello ')
        const tag = await Tag.findOne({ tagName: req.body.tagName });
        if (!tag) {
            const newTag = await Tag.create({ tagName: req.body.tagName });
            res.status(200).json(newTag);
        } else {
            res.status(409).json({error:"the tag name is already exists"})
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// delete blog
const deleteBlog = async (req, res) => {};

export {
    createBlog,
    returnBlogsByDate,
    returnBlogsByTag,
    createNewTag,
    returnTagNames,
};
