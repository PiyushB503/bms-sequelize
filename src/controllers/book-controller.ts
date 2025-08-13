import { Request, Response } from "express";
import { BookService } from "../services/book-service";  
import { sequelize } from "../database/db";

const bookService = new BookService(); 

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await bookService.getAllBooks();

    if (!books.length) {
      res.status(404).json({ message: "No books found in the DB" });
      return;
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error while fetching all books", error: error.message });
  }
};


export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { body: { bookData } } = req; 

  
    const newBook = await bookService.createBook(bookData);

    res.status(201).json({
      message: "Book created successfully",
      book: newBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while creating book",
      error: error.message
    });
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = Number(req.params.id);

    if (isNaN(bookId)) {
      res.status(400).json({ message: "Invalid book ID" });
      return;
    }

    const result = await bookService.deleteBook(bookId);

    if (result) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error while deleting a book", error: error.message });
  }
};
