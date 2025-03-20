import connection from '../../persistence-layer/connection.js';

class Users {
    constructor(dbConnection) {
        this.connection = dbConnection;
    }
    
    async getUserByUsername(username) {
        let connect;
        try {

            connect = await this.connection.getConnection();

            const query = 'SELECT User_ID, Username, User_Password FROM BOOKI_USER WHERE Username = ?';
    
            const [results] = await connect.execute(query, [username]);

            console.log(`Results:`, results);
    
            if (!results || results.length === 0) {
                return null;
            }

            return results[0];
        } catch (error) {
            console.log(`Error: Could not retrieve user.`)
            return null;
        } finally {
            if (connect) {
                connect.release();
            }
        }
    }
    
    
    async createUser(email, username, password) {
        let connect;
        try {

            connect = await this.connection.getConnection();

            const query = 'INSERT INTO BOOKI_USER (Username, User_Email, User_Password) VALUES (?, ?, ?)';

            const [result] = await connect.execute(query, [username, email, password]);

            console.log(`User created with the ID:`, result.insertId);
    
            return result.insertId;
        } catch (error) {
            console.log("Error creating user:", error);
            return null;
        } finally {
            if (connect) {
                connect.release();
            }
        }
    }

}

// Export an instance of Users with the database connection
export default new Users(connection);