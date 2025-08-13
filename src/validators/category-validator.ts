import { body, param } from "express-validator";

export const createCategoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 2 })
    .withMessage("Category name must be at least 2 characters long"),
];

export const deleteCategoryValidator = [
  param("id")
    .notEmpty()
    .withMessage("Category ID is required")
    .isInt({ gt: 0 })
    .withMessage("Category ID must be a positive integer"),
];
