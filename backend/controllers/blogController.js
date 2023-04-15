import mongoose from "mongoose";
import Blog from "../models/blogModel.js";
import Tag from "../models/tagsModel.js";

// get only blog by id
const getBlog = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.blogID)) {
            return res.status(404).json({
                error: "no such blog",
            });
        }
        const blog = await Blog.findOne(
            { _id: req.params.blogID },
            { ...req.body }
        );
        if (!blog) {
            return res.status(404).json({ error: "no such a blog" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// blog with writer 
const getBlogWithWriter = async (req, res) => {
    const blogId = req.params.blogID;
    try {
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(404).json({
                error: "no such blog",
            });
        }
        const blog = await Blog.findById(blogId).populate({
            path: "writerID",
            model: "writer",
            select: "firstName lastName avatar",
        });

        if (!blog) {
            // handle case where blog is not found
            return res.status(404).json({ error: "no such a blog" });
        }
        const writer = {
            writerID: blog.writerID._id,
            firstName: blog.writerID.firstName,
            lastName: blog.writerID.lastName,
            avatar: blog.writerID.avatar,
        };
        blog.writerID = "";

        res.status(200).json({ blog, writer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// blog summaries 
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find(
            {},
            "title description mainImage tag publishDate minutes writerID"
        ).populate({
            path: "writerID",
            model: "writer",
            select: "firstName lastName avatar",
        });
        if (!blogs) {
            // handle case where there are no any blogs 
            return res.status(404).json({ error: "no blog found" });
        }

        res.status(200).json({ blogs });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// create a new blog
const createBlog = async (req, res) => {
    const data = req.body;
    try {
        const blog = await Blog.create({
            ...data,
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
        return res.status(404).json({ error: "There is no blog yet" });
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
// return blogs of given writerID
const returnWriterBlogs = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.writerID)) {
            return res.status(404).json({
                error: "no such writer",
            });
        }
        const blogs = await Blog.find({ writerID: req.params.writerID });
        if (blogs.length == 0) {
            return res.status(404).json({ error: "no blogs for this user" });
        }
        res.status(200).json(blogs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// return tag names
const returnTagNames = async (req, res) => {
    try {
        const tags = await Tag.find({});
        if (tags.length == 0) {
            return res.status(404).json({ error: "There is no blog yet" });
        }
        res.status(200).json(tags);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createNewTag = async (req, res) => {
    try {
        console.log("hello ");
        const tag = await Tag.findOne({ tagName: req.body.tagName });
        if (!tag) {
            const newTag = await Tag.create({ tagName: req.body.tagName });
            return res.status(200).json(newTag);
        } else {
            res.status(409).json({ error: "the tag name is already exists" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// delete blog
const deleteBlog = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.blogID)) {
            return res.status(404).json({
                error: "no such blog",
            });
        }
        const blog = await Blog.findOneAndDelete({ _id: req.params.blogID });
        if (!blog) {
            return res.status(404).json({ error: "no such a blog" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update blog
const updateBlog = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.blogID)) {
            return res.status(404).json({
                error: "no such blog",
            });
        }
        const blog = await Blog.findOneAndUpdate(
            { _id: req.params.blogID },
            { ...req.body }
        );
        if (!blog) {
            return res.status(404).json({ error: "no such a blog" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export {
    createBlog,
    returnBlogsByDate,
    returnBlogsByTag,
    createNewTag,
    returnTagNames,
    returnWriterBlogs,
    deleteBlog,
    getBlog,
    getBlogWithWriter,
    getAllBlogs,
    updateBlog,
};
