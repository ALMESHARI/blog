import Express from "express";
import {
    createBlog,
    createNewTag,
    returnBlogsByDate,
    returnBlogsByTag,
    returnTagNames
} from "../controllers/blogController.js";


const router = Express.Router();

// all the blogs
router.get("/", returnBlogsByDate);

// return blogs tags
router.get("/tag", returnTagNames);

// blogs in specific tag
router.get("/tag/:tagName", returnBlogsByTag);

// create a new tag
router.post("/tag/newTag", createNewTag);

// return famous writers
router.get("/@", (req, res) => {
    res.json({ mssg: `those are the famous writers` });
});

// blog by writer
router.get("/@:writer/", (req, res) => {
    res.json({ mssg: `this is blogs written by ${req.params.writer}` });
});

// by blog name (could be canceled)
router.get("/:blogName", (req, res) => {
    res.json({
        mssg: `this is the blog ${req.params.blogName}`,
    });
});



router.post("/newBlog", createBlog);

export default router;
