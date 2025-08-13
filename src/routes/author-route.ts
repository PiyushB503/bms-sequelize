import express from "express";
import {
  getAllAuthor,
  createAuthor,
  deleteAuthor
} from "../controllers/author-controller";
import { createAuthorValidator, deleteAuthorValidator } from "../validators/author-validator";
import { validate } from "../middlewares/validate-middleware";
const router = express.Router();

router.get("/getAllAuthor", getAllAuthor);
router.post("/", validate(createAuthorValidator), createAuthor);
router.delete("/:id", validate(deleteAuthorValidator), deleteAuthor);

export default router;