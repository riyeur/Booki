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
    
    
    async createUser(email, username, password) {
        try {
            const query = 'INSERT INTO BOOKI_USER (Username, User_Email, User_Password) VALUES (?, ?, ?)';

            const [result] = await this.connection.execute(query, [username, email, password]);
    
            return result.insertId;
        } catch (error) {
            return null;
        }
    }

}

// Export an instance of Users with the database connection
export default new Users(connection);