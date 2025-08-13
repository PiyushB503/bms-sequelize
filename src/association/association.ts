import { Author } from "../models/authorModel";
import { Books } from "../models/bookModel";
import { Category } from "../models/categoryModel";


Author.hasMany(Books, { foreignKey: "authorId", onDelete: "CASCADE" });
Books.belongsTo(Author, { foreignKey: "authorId" });

Category.hasMany(Books, { foreignKey: "categoryId", onDelete: "CASCADE" });
Books.belongsTo(Category, { foreignKey: "categoryId" });
