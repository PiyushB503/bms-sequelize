import { Request, Response } from "express";
import { Author } from "../models/author-model";
import { sequelize } from "../database/db";
import { AuthorService } from "../services/author-service";

const authorService = new AuthorService();

export const getAllAuthor = async (req: Request, res: Response): Promise<void> => {
  try {
    const authors = await authorService.getAllAuthors();

    if (!authors.length) {
      res.status(400).json({
        message: "Authors not found in the DB",
      });
      return;
    }

    res.status(200).json(authors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while fetching all Authors", error: error instanceof Error ? error.message : String(error), });
  }
};

export const createAuthor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { body : {name} } = req;

    if (!name) {
      res.status(400).json({ message: "Author name is required" });
      return
    }

    const newAuthor = await authorService.createAuthor({ name });

    if (!newAuthor) {
      res.status(400).json({ message: "Author not created" });
      return
    }


    res.status(201).json({ message: "Author created successfully", author: newAuthor });
  } catch (error) {

    res.status(500).json({ message: "Error while creating a Author", error: error instanceof Error ? error.message : String(error), });
  }
};

export const deleteAuthor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { params: { id : authorId } } = req;

    if (!authorId) {

      res.status(400).json({ message: "invalid Author id" });
      return
    }

    const isDeleted = await authorService.deleteAuthor(authorId);

    if (isDeleted) {
      res.status(200).json({ message: "Author deleted successfully" });
    } else {
      res.status(400).json({
        message: "Author not found",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error while deleting a Author", error: error instanceof Error ? error.message : String(error), });
  }
};