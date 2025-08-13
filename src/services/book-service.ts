import { Books } from "../models/bookModel";
import { Author } from "../models/authorModel";
import { Category } from "../models/categoryModel";
import { sequelize } from "../database/db";

export class BookService {


    async getAllBooks(): Promise<Books[]> {
        return await sequelize.transaction(async (transaction) => {
            const books = await Books.findAll({ transaction });

            if (!books.length) {
                throw new Error("No books found");
            }

            return books;
        });
    }


    async createBook(bookData: { title: string; isbn: string; price: number; authorId: number; categoryId: number }): Promise<Books> {
        return await sequelize.transaction(async (transaction) => {
            const { title, isbn, price, authorId, categoryId } = bookData;


            const [author, category] = await Promise.all([
                Author.findByPk(authorId, { transaction }),
                Category.findByPk(categoryId, { transaction }),
            ]);

            if (!author || !category) {
                throw new Error("Invalid author or category ID");
            }


            const book = await Books.create({ title, isbn, price, authorId, categoryId }, { transaction });

            return book;
        });
    }


    async deleteBook(bookId: number): Promise<boolean> {
        return await sequelize.transaction(async (transaction) => {
            const book = await Books.findByPk(bookId, { transaction });

            if (!book) {
                throw new Error("Book not found");
            }


            await book.destroy({ transaction });

            return true;
        });
    }
}
