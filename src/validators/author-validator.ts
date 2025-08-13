import { body, param } from "express-validator";

export const createAuthorValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Author name is required")
        .isLength({ min: 2 })
        .withMessage("Author name must be at least 2 characters long"),
];

export const deleteAuthorValidator = [
    param("id")
        .notEmpty()
        .withMessage("Author ID is required")
        .isInt({ gt: 0 })
        .withMessage("Author ID must be a positive integer"),
];
