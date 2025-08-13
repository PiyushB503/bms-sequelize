import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories
} from "../controllers/category-controller";
import { validate } from "../middlewares/validate-middleware";
import { createCategoryValidator, deleteCategoryValidator } from "../validators/category-validator";
const router = express.Router();

router.get("/getAllCategory", getAllCategories);
router.post("/", validate(createCategoryValidator), createCategory);
router.delete("/:id", validate(deleteCategoryValidator), deleteCategory);

export default router;