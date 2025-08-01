import express from "express";
import {
  getAllAuthor,
  createAuthor,
  deleteAuthor
} from "../controllers/authorController";
const router = express.Router();

router.get("/getAllAuthor", getAllAuthor);
router.post("/createAuthor", createAuthor);
router.delete("/deleteAuthor/:id", deleteAuthor);

export default router;