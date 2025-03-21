import Results from '../../persistence-layer/database-functions/Results.js';
import jwt from 'jsonwebtoken';
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

    async saveBookForUser(token, bookID) {
        try {
            const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
            const userID = decoded_token.userID;
            // save the requested bookmark using the sql querry in the persistence layer
            console.log(`Sending book to database function with boodID ${bookID}.`);
            const response = await this.results.createBookmarkForUser(bookID, userID);

            return response;
        }
        catch (error){
            return false;
        }
    }
}

export default new ResultService(Results);
