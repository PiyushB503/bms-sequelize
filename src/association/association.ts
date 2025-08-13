import { Author } from "../models/author-model";
import { Books } from "../models/book.model";
import { Category } from "../models/category.model";


Author.hasMany(Books, { foreignKey: "authorId", onDelete: "CASCADE" });
Books.belongsTo(Author, { foreignKey: "authorId" });

Category.hasMany(Books, { foreignKey: "categoryId", onDelete: "CASCADE" });
Books.belongsTo(Category, { foreignKey: "categoryId" });
