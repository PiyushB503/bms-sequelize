import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export class Author extends Model {}

Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Author",
    tableName: "authors",  // Define table name as 'authors'
  }
);
