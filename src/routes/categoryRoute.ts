import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories
} from "../controllers/categoryController";
import { validate } from "../middlewares/validateMiddleware";
import { createCategoryValidator, deleteCategoryValidator } from "../validators/category-validator";
const router = express.Router();

router.get("/getAllCategory", getAllCategories);
router.post("/", validate(createCategoryValidator), createCategory);
router.delete("/:id", validate(deleteCategoryValidator), deleteCategory);

export default router;