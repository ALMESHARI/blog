import Express from "express";
import { createWriter, deleteWriter, getWriter, returnTopWriters, updateWriter } from "../controllers/writerController.js";

const router = Express.Router();

// create a new account
router.post('/newAccount', createWriter)

// return famous writers
router.get("/", returnTopWriters);

// get writer
router.get("/writer/:writerID", getWriter)

// update writer
router.put("/update/:writerID/", updateWriter)

// delete writer
router.delete("/delete/:writerID/", deleteWriter)


export default router;