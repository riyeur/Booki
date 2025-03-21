import Results from '../../persistence-layer/database-functions/Results.js';
import dotenv from 'dotenv';

dotenv.config();

class ResultService {

    constructor(results) {
        this.results = results;
        this.getBooks = this.getBooks.bind(this);
    }

    async getBooks(ids) {
        console.log(`(ResultService) Getting the books`);

        // Get the generated books from the database
        const books = await this.results.getBooksByBookId(ids);

        if (!books) {
            return false;
        }

        console.log(`(ResultService) Recieved the books: `, books);

        return books;
    }
}

export default new ResultService(Results);
