import { Request, Response } from "express";
import { Book } from "../models/bookModel";
import { Author } from "../models/authorModel";
import { Category } from "../models/categoryModel";

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await Book.findAll();

    if (!books.length) {
      res.status(404).json({ message: "No books found in the DB" });
      return;
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error while fetching all books", error });
  }
};

export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, isbn, price, authorId, categoryId } = req.body;

    if (!title || !isbn || !price || !authorId || !categoryId) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const author = await Author.findByPk(authorId);
    if (!author) {
      res.status(400).json({ message: "Invalid author ID." });
      return;
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      res.status(400).json({ message: "Invalid category ID." });
      return;
    }

    const book = await Book.create({ title, isbn, price, authorId, categoryId });

    res.status(201).json({
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({ message: "Error while creating a book", error });
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = Number(req.params.id);

    if (isNaN(bookId)) {
      res.status(400).json({ message: "Invalid book ID" });
      return;
    }

    const book = await Book.findByPk(bookId);

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    await book.destroy();

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error while deleting a book", error });
  }
};
