import { sequelize } from "../database/db";
import { Author } from "../models/authorModel";

export class AuthorService {
    async getAllAuthors(): Promise<Author[]> {
        return await sequelize.transaction(async (transaction) => {
            const authors = await Author.findAll({ transaction });

            if (!authors.length) {
                throw new Error("No authors found");
            }

            return authors;
        });
    }

    async createAuthor(authorData: { name: string }): Promise<Author> {
        return await sequelize.transaction(async (transaction) => {
            const { name } = authorData;

            if (!name) {
                throw new Error("Author name is required");
            }

            const author = await Author.create({ name }, { transaction });

            return author;
        });
    }

    async deleteAuthor(authorId: string): Promise<boolean> {
        return await sequelize.transaction(async (transaction) => {
            const author = await Author.findByPk(authorId, { transaction });

            if (!author) {
                throw new Error("Author not found");
            }

            await author.destroy({ transaction });

            return true;
        });
    }
}