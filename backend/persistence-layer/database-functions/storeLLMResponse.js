// This class stores the LLM book recommendations in the database

import connection from '../../persistence-layer/connection.js';
import run from '../../business-layer/services/LLMPromptService.js';


class StoreLLMResponse {

    constructor(dbConnection) {
        this.connection = dbConnection;
    }
    
    //run LLM prompt and store results
    async storeBooksInDatabase() {
        try {
            // Generate and parse the content using the prompt
            const books = await run();

            // Insert each book into the database
            for (const book of books) {
                await this.storeResponse(book); // Store each book in the database
            }

        } catch (error) {
            console.error("Error in storing generated books:", error);
        }
    }

    //Insert into database (data is the parsed response)
    async storeResponse(data) {
        const query = 'INSERT INTO BOOK (bookName, author, accessibility) VALUES (?, ?, ?)';

        const myPromise = new Promise((resolve, reject) => {
            this.connection.query(query, [data.Book, data.Author, data.Accessibility], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(console.log(`Book ${data.Book} inserted successfully.`));
            });
        });

        return myPromise;
    }
}


// Export an instance of StoreLLMResponse  with the database connection
export default new StoreLLMResponse(connection);
