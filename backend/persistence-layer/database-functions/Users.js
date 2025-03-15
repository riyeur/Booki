import connection from '../../persistence-layer/connection.js';

class Users {

    constructor(dbConnection) {
        this.connection = dbConnection;
    }

    getUserByUsername(username) {
        // Get all users from the database with the username inputted (should only be one)
        const myPromise = new Promise((resolve, reject) => {
            const query = 'SELECT User_ID, Username, User_Password FROM BOOKI_USER WHERE Username = ?';
            
            this.connection.query(query, [username], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                
                resolve(results.length ? results[0] : null);
            });
        });

        return myPromise;
    }
}

// Export an instance of Users with the database connection
export default new Users(connection);
