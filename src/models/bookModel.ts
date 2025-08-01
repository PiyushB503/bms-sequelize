import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Author } from "./authorModel";
import { Category } from "./categoryModel";

export class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      references: {
        model: Author,
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
    },
     price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
     isbn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Book",
    tableName: "books",
  }
);
