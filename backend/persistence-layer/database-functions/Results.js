// This file contains database functions relating to bookmarks
import connection from '../../persistence-layer/connection.js';

class Results {
    constructor(dbConnection) {
        this.connection = dbConnection;
    }

    /**
     * Retrieves books based on a list of book IDs.
     * @param {Array<number>} bookIDs - An array of book IDs to fetch details for.
     * @returns {Promise<Array<{bookId: number, bookName: string, authorName: string, accessibilityInfo: string, bookDescription: string}>>} - An array of book details.
     */
    async getBooksByBookId(bookIDs) {
        // get all bookmarks from the database based on current book ID
        try {
            const individualIDs = bookIDs.map(() => '?').join(',');
            
            const query = `SELECT Book_ID, Book_Name, Author, Accessibility, Description FROM BOOK WHERE Book_ID IN (${individualIDs})`;

            const [books] = await this.connection.execute(query, [...bookIDs]);

            const formattedResultsForResults = books.map(book => ({
                bookId: book.Book_ID,
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

    /**
     * Assigns a book to a specific user by updating the User_ID field.
     * @param {number} bookID - The ID of the book to be assigned.
     * @param {number} userID - The ID of the user who will own the bookmark.
     * @returns {Promise<boolean | null>} - Returns true if the update was successful, null if an error occurred.
     */
    async createBookmarkForUser(bookID, userID) {
        try {
            const query = 'UPDATE BOOK SET User_ID = ? WHERE Book_ID = ?';

            const [bookmark] = await this.connection.execute(query, [userID, bookID]);

            console.log(`Book with ID ${bookID} updated with User_ID ${userID}`);
    
            return true;
        } catch (error) {
            console.log("Error saving bookmark:", error);
            return null;
        }
    }
}

export default new Results(connection);
