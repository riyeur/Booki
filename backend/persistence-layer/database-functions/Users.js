import connection from '../../persistence-layer/connection.js';

class Users {
    constructor(dbConnection) {
        this.connection = dbConnection;
    }
    
    getUserByUsername(username) {
        // Get all users from the database with the username inputted (should only be one)
        const myPromise = new Promise((resolve, reject) => {
            console.log("Reached database function");
            const query = 'SELECT User_ID, Username, User_Password FROM BOOKI_USER WHERE Username = ?';
            
            this.connection.query(query, [username], (error, results) => {
                if (error) {
                    console.error("MySQL query error:", error);
                    reject(error);
                    return;
                }
                
                console.log("Database query results:", results);
                resolve(results.length ? results[0] : null);
            });
        });
        
        console.log("Returning from database function");
        return myPromise;
    }
    
    createUser(email, username, password) {
        const myPromise = new Promise((resolve, reject) => {
            const query = 'INSERT INTO BOOKI_USER (Username, User_Email, User_Password) VALUES (?, ?, ?)';
            
            this.connection.query(query, [username, email, password], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                
                resolve(results.insertId);
            });
        });
        
        return myPromise;
    }
}

// Export an instance of Users with the database connection
export default new Users(connection);