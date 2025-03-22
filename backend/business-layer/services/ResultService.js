/**
 * This file defines the ResultService class, which is responsible for handling book-related operations for users.
 * The 'getBooks' method fetches books from the database by their IDs and returns the book data.
 * If no books are found, it returns false.
 * The 'saveBookForUser' method verifies the user's JWT token, decodes it to get the user ID, 
 * and then saves the requested book as a bookmark for that user in the database.
 * It uses the persistence layer's functions to handle database interactions.
 * If the token is invalid or there is an error, it returns false.
 */

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

export default ResultService;
