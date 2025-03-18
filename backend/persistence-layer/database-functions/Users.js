import connection from '../../persistence-layer/connection.js';

class Users {
    constructor(dbConnection) {
        this.connection = dbConnection;
    }
    
    async getUserByUsername(username) {
        try {
            console.log("Reached database function for user:", username);
            const query = 'SELECT User_ID, Username, User_Password FROM BOOKI_USER WHERE Username = ?';
    
            console.log("Executing SQL query:", query, "with param:", username);
    
            const [results] = await this.connection.execute(query, [username]);
    
            console.log("Query execution complete.");
    
            console.log("Database query results:", results);
    
            if (!results || results.length === 0) {
                console.log("No user found for username:", username);
                return null;
            }
    
            console.log("User found:", results[0]);
            return results[0];
        } catch (error) {
            console.error("MySQL query error:", error);
            return null;
        }
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