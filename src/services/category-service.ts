import { Category } from "../models/category.model";
import { sequelize } from "../database/db";

export class CategoryService {

  async getAllCategories(): Promise<Category[]> {
    return await sequelize.transaction(async (transaction) => {
      const categories = await Category.findAll({ transaction });

      if (!categories.length) {
        throw new Error("No categories found");
      }

      return categories;
    });
  }

  async createCategory(categoryData: { name: string }): Promise<Category> {
    return await sequelize.transaction(async (transaction) => {
      const { name } = categoryData;

      if (!name) {
        throw new Error("Category name is required");
      }


      const category = await Category.create({ name }, { transaction });

      return category;
    });
  }


  async deleteCategory(categoryId: string): Promise<boolean> {
    return await sequelize.transaction(async (transaction) => {
      const category = await Category.findByPk(categoryId, { transaction });

      if (!category) {
        throw new Error("Category not found");
      }


      await category.destroy({ transaction });

      return true;
    });
  }
}
