// This file contains database functions relating to bookmarks
import connection from '../../persistence-layer/connection.js';

class Bookmarks {
    constructor(dbConnection) {
        this.connection = dbConnection;
    }

    async getBooksByUserId(userId) {
        try {
            // get bookmarks from the database based on current user id
            const query = 'SELECT Book_ID, Book_Name, Author, Accessibility, Description FROM BOOK WHERE User_ID=?';
            const [results] = await this.connection.execute(query, [userId]);

            if (!results || results.length === 0) {
                return null;
            }

            // format the bookmarks to match the expected structure
            const formattedBookmarks = results.map(book => ({
                bookId: book.Book_ID,
                bookName: book.Book_Name,
                authorName: book.Author,
                accessibilityInfo: book.Accessibility,
                bookDescription: book.Description
            }));

            return formattedBookmarks;
        }
        catch (error){
            return null;
        } 
    }

    async deleteBookmarkByBookId(bookId) {
        try {
            // delete bookmark from database based on book id
            const query = 'DELETE FROM BOOK WHERE Book_ID=?';
            const [result] = await this.connection.execute(query, [bookId]);

            if (result.affectedRows > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error){
            return false;
        }
    }
}

export default new Bookmarks(connection);