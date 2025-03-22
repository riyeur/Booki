// This class stores the LLM book recommendations in the database

import connection from '../connection.js';

class StoreLLMResponse {

    constructor(dbConnection) {
        this.connection = dbConnection;
    }
    
    /**
     * Stores an array of book recommendations in the database.
     * @param {Array<{Book: string, Author: string, Accessibility: string, Description: string}>} parsedBooks - The books to be inserted.
     * @returns {Promise<Array<number>>} - An array of inserted book IDs.
     */
    async storeBooksInDatabase(parsedBooks) {
        try {
            let insertedBookIds = [];

            for (const book of parsedBooks) {
                const bookID = await this.storeResponse(book);
                insertedBookIds.push(bookID);
            }
            console.log("All books have been inserted into the database with UserID = null.");

            return insertedBookIds;
        } catch (error) {
            console.error("Error inserting books:", error);
            return [];
        }
    }
    
    /**
     * Inserts a single book recommendation into the database.
     * @param {{Book: string, Author: string, Accessibility: string, Description: string}} data - The book data to insert.
     * @returns {Promise<number | undefined>} - The ID of the inserted book or undefined if insertion fails.
     */
    async storeResponse(data) {
        const query = 'INSERT INTO BOOK (Book_Name, Author, Accessibility, Description) VALUES (?, ?, ?, ?)';

        try {
            const [results] = await this.connection.execute(query, [data.Book, data.Author, data.Accessibility, data.Description]);
            console.log(`Book "${data.Book}" inserted successfully.`);
            return results.insertId;
        } catch (error) {
            console.error(`Error inserting book "${data.Book}":`, error);
        }
    }
}

export default new StoreLLMResponse(connection);

