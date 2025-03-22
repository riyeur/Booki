import connection from '../../persistence-layer/connection.js';

class Users {
    constructor(dbConnection) {
        this.connection = dbConnection;
    }
    
    /**
     * Retrieves a user by their username.
     * @param {string} username - The username of the user.
     * @returns {Promise<{User_ID: number, Username: string, User_Password: string} | null>} - The user object if found, otherwise null.
     */
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
            console.log(`Error: Could not retrieve user.`);
            return null;
        }
    }
    
    /**
     * Creates a new user in the database.
     * @param {string} email - The email of the user.
     * @param {string} username - The username of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<number | null>} - The ID of the created user if successful, otherwise null.
     */
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

    /**
     * Retrieves the username based on the user ID.
     * @param {number} userId - The ID of the user.
     * @returns {Promise<string | null>} - The username if found, otherwise null.
     */
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
