import Express from "express";
import {
    getImage,
    uploadImage,
    uploadImageResolutions,
} from "../controllers/imageController.js"; 
import multer from "multer";

const router = Express.Router();
const upload = multer();


router.post("/upload/main", upload.single("image"), uploadImageResolutions);
router.post("/upload/content", upload.single("image"), uploadImage);


router.get("/get/:id/:type?", getImage);

export default router
