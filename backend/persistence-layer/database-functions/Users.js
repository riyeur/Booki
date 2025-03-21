import connection from '../../persistence-layer/connection.js';

class Users {
    constructor(dbConnection) {
        this.connection = dbConnection;
    }
    
    async getUserByUsername(username) {
        try {
            const query = 'SELECT User_ID, Username, User_Password FROM BOOKI_USER WHERE Username = ?';
    
            const [users] = await this.connection.execute(query, [username]);

            console.log(`User:`, users);
    
            if (!users) {
                return null;
            }

            return users[0];
        } catch (error) {
            console.log(`Error: Could not retrieve user.`)
            return null;
        }
    }
    
    
    async createUser(email, username, password) {
        try {
            const query = 'INSERT INTO BOOKI_USER (Username, User_Email, User_Password) VALUES (?, ?, ?)';

            const [result] = await this.connection.execute(query, [username, email, password]);

            console.log(`User created with the ID:`, result.insertId);
    
            return result.insertId;
        } catch (error) {
            console.log("Error creating user:", error);
            return null;
        }
    }

    async getUsernameByUserId(userId) {
        try {
            const query = 'SELECT Username FROM BOOKI_USER WHERE User_ID = ?';
    
            const [results] = await this.connection.execute(query, [userId]);
    
            if (!results || results.length === 0) {
                return null;
            }
            return results[0].Username;
        } catch (error) {
            return null;
        }
    }

}

// Export an instance of Users with the database connection
export default new Users(connection);