// This class stores the LLM book recommendations in the database

import connection from '../connection.js';

class StoreLLMResponse {

    constructor(dbConnection) {
        this.connection = dbConnection;
    }
    
    // Accepts parsedBooks as an argument
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
    

    // Insert book data into the database
    storeResponse(data, callback) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO BOOK (Book_Name, Author, Accessibility, Description) VALUES (?, ?, ?, ?)';

            this.connection.query(query, [data.Book, data.Author, data.Accessibility, data.Description], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                console.log(`Book "${data.Book}" inserted successfully.`);
                resolve(results.insertId);
            });
        });
    }

}

export default new StoreLLMResponse(connection);
