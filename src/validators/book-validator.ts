import { body, param } from "express-validator";

export const createBookValidator = [
  body("bookData.title")
    .notEmpty()
    .withMessage("Title is required"),
  body("bookData.isbn")
    .notEmpty()
    .withMessage("ISBN is required"),
  body("bookData.price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0"),
  body("bookData.authorId")
    .isInt({ gt: 0 })
    .withMessage("Author ID must be a positive integer"),
  body("bookData.categoryId")
    .isInt({ gt: 0 })
    .withMessage("Category ID must be a positive integer"),
];

export const deleteBookValidator = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Book ID must be a positive integer"),
];
