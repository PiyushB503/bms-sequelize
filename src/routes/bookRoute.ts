import express from "express";
import { createBook, getAllBooks, deleteBook } from "../controllers/bookController";

const router = express.Router();

router.post("/createBook", createBook);
router.get("/getAllBooks", getAllBooks);
router.delete("/deleteBook/:id", deleteBook);

export default router;
