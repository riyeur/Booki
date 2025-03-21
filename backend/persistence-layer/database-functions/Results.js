// This file contains database functions relating to bookmarks
import connection from '../../persistence-layer/connection.js';

class Results {
    constructor(dbConnection) {
        this.connection = dbConnection;
    }

    async getBooksByBookId(bookIDs) {
        // get all bookmarks from the database based on current book ID
        try {
            const individualIDs = bookIDs.map(() => '?').join(',');
            
            const query = `SELECT Book_Name, Author, Accessibility, Description FROM BOOK WHERE Book_ID IN (${individualIDs})`;

            const [books] = await this.connection.execute(query, [...bookIDs]);

            const formattedResultsForResults = books.map(book => ({
                bookName: book.Book_Name,
                authorName: book.Author,
                accessibilityInfo: book.Accessibility,
                bookDescription: book.Description
            }));

            return formattedResultsForResults;

        } catch (error) {
            console.log(`Unable to get the books`);
            return [];
        }
    }
}

export default new Results(connection);