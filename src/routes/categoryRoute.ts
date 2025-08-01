import express from "express";
import {
  getAllCategory,
  createCategory,
  deleteCategory
} from "../controllers/categoryController";
const router = express.Router();

router.get("/getAllCategory", getAllCategory);
router.post("/createCategory", createCategory);
router.delete("/deleteCategory/:id", deleteCategory);

export default router;