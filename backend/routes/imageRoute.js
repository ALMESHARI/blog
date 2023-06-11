import Express from "express";
import {
    getImage,
    uploadImage,
    uploadImageResolutions,
} from "../controllers/imageController.js"; 
import multer from "multer";

const router = Express.Router();
const upload = multer();

// upload an image with 3 resolutions, these are images in the blog main image, and the writer profile image 
router.post("/upload/main", upload.single("image"), uploadImageResolutions);

// upload an image with just original resolution, these are images in the blog content
router.post("/upload/content", upload.single("image"), uploadImage);

// get an image by id and type as resolution ("original", "medium", "low")
router.get("/get/:id/:type?", getImage);

export default router
