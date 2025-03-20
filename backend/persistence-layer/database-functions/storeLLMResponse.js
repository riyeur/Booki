// This class stores the LLM book recommendations in the database

import connection from '../connection.js';

class StoreLLMResponse {

    constructor(dbConnection) {
        this.connection = dbConnection;
    }
    
    // Accepts parsedBooks as an argument
    async storeBooksInDatabase(parsedBooks) {
        let index = 0; // Track inserted books
    
        const insertNextBook = () => {
            if (index >= parsedBooks.length) {
                console.log("All books inserted successfully.");
                return;
            }
    
            const book = parsedBooks[index];
            this.storeResponse(book, (error) => {
                if (error) {
                    console.error("Error inserting book:", error);
                    return;
                }
    
                index++; // Move to the next book
                insertNextBook(); // Recursively call to insert next book
            });
        };
    
        insertNextBook(); // Start inserting books
    }
    

    // Insert book data into the database
    storeResponse(data, callback) {
        const query = 'INSERT INTO BOOK (Book_Name, Author, Accessibility, Book_Description) VALUES (?, ?, ?, ?)';
    
        this.connection.query(query, [data.Book, data.Author, data.Accessibility, data.Description], (error, results) => {
            if (error) {
                return callback(error);
            }
            console.log(`Book ${data.Book} inserted successfully.`);
            callback(null);
        });
    }
    

    // FOR DEBUGGING ONLY
    // Retrieve all books from the database
    getStoredBooks(callback) {
        const query = 'SELECT * FROM BOOK';
    
        this.connection.query(query, (error, results) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, results);
        });
    }


}

export default new StoreLLMResponse(connection);
