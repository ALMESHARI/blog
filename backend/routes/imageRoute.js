import Express from "express";
import { getImage, uploadImage } from "../controllers/imageController.js"; 
import multer from "multer";

const router = Express.Router();
const upload = multer();


router.post("/upload", upload.single("image"), uploadImage);

router.get("/get/:id", getImage);

export default router
