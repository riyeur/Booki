import connection from '../../persistence-layer/connection.js';

class Users {
    constructor(dbConnection) {
        this.connection = dbConnection;
    }
    
    async getUserByUsername(username) {
        try {
            const query = 'SELECT User_ID, Username, User_Password FROM BOOKI_USER WHERE Username = ?';
    
            const [results] = await this.connection.execute(query, [username]);
    
            if (!results || results.length === 0) {
                return null;
            }

            return results[0];
        } catch (error) {
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