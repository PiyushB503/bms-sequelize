import { Request, Response } from "express";
import { CategoryService } from "../services/category-service";

const categoryService = new CategoryService();


export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await categoryService.getAllCategories();

    if (!categories.length) {
      res.status(404).json({
        message: "No categories found in the DB",
      });
      return;
    }

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Error while fetching all categories",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};


export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { body: {name} } = req;

    if (!name) {
      res.status(400).json({ message: "Category name is required" });
      return
    }

    const newCategory = await categoryService.createCategory({ name });
    if (!newCategory) {
      res.status(400).json({ message: "Category not created" });
      return
    }
    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while creating category",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};


export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { params: { id: categoryId } } = req;

    if (!categoryId) {
      res.status(400).json({ message: "Invalid category ID" });
      return;
    }

    const isDeleted = await categoryService.deleteCategory(categoryId);  // Delete category using the service

    if (isDeleted) {
      res.status(200).json({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error while deleting category",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
