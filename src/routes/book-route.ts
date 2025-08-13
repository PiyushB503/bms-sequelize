import express from "express";
import { createBook, getAllBooks, deleteBook } from "../controllers/book-controller";
import { validate } from "../middlewares/validate-middleware";
import { createBookValidator, deleteBookValidator } from "../validators/book-validator";

const router = express.Router();

router.get("/getAllBooks", getAllBooks);
router.post("/", validate(createBookValidator), createBook);
router.delete("/:id", validate(deleteBookValidator), deleteBook);

export default router;
