// This file contains database functions relating to bookmarks
import connection from '../../persistence-layer/connection.js';

class Bookmarks {
    constructor(dbConnection) {
        this.connection = dbConnection;
    }

    getBooksByUserId(userId) {
        // get all bookmarks from the database based on current user id
        const myPromise = new Promise( (resolve, reject) => {
            const query = 'SELECT Book_Name, Author, Accessibility, Description FROM BOOK b INNER JOIN BOOKI_USER u ON b.User_ID=u.User_ID WHERE u.User_ID=?';
            this.connection.query(query, [userId], (error, results) => {
                if (error) {
                    console.log("error in bookmarks.js: ", error);
                    reject(error);
                    return;
                }
                
                resolve(results.length ? results : null);
            });
        });
        return myPromise;
    }
}

export default new Bookmarks(connection);