import Express from "express";
import {
    createBlog,
    createNewTag,
    deleteBlog,
    getBlog,
    returnBlogsByDate,
    returnBlogsByTag,
    returnTagNames,
    returnWriterBlogs,
    updateBlog
} from "../controllers/blogController.js";


const router = Express.Router();

// get blog
router.get('/blog/:blogID', getBlog)

// all the blogs
router.get("/", returnBlogsByDate);

// return blogs tags
router.get("/tag", returnTagNames);

// blogs in specific tag
router.get("/tag/:tagName", returnBlogsByTag);

// create a new tag
router.post("/tag/newTag", createNewTag);

// blog by writerID
router.get("/@:writerID/", returnWriterBlogs);

// delete blog
router.delete('/delete/:blogID', deleteBlog)

// update blog
router.put('/update/:blogID', updateBlog)


router.post("/newBlog", createBlog);

export default router;
