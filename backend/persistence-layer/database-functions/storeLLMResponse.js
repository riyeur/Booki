// This class stores the LLM book recommendations in the database

import connection from '../connection.js';

class StoreLLMResponse {

    constructor(dbConnection) {
        this.connection = dbConnection;
    }
    
    // Accepts parsedBooks as an argument
    async storeBooksInDatabase(parsedBooks) {
        try {
            // Insert each book into the database
            for (const book of parsedBooks) {
                await this.storeResponse(book);
            }
        } catch (error) {
            console.error("Error in storing generated books:", error);
        }
    }

    // Insert book data into the database
    async storeResponse(data) {
        const query = 'INSERT INTO BOOK (Book_Name, Author, Accessibility) VALUES (?, ?, ?)';

        return new Promise((resolve, reject) => {
            this.connection.query(query, [data.Book, data.Author, data.Accessibility], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                console.log(`Book ${data.Book} inserted successfully.`);
                resolve();
            });
        });
    }

    // FOR DEBUGGING ONLY
    // Retrieve all books from the database
    async getStoredBooks() {
        const query = 'SELECT * FROM BOOK';

        return new Promise((resolve, reject) => {
            this.connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }


}

export default new StoreLLMResponse(connection);
