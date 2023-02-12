import Express from "express";
import { createWriter } from "../controllers/writerController.js";

const router = Express.Router();

// create a new account
router.post('/newAccount', createWriter)

export default router;