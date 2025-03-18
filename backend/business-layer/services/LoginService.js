import Users from '../../persistence-layer/database-functions/Users.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class LoginService {

    constructor(users) {
        this.users = users;
        this.authenticateUser = this.authenticateUser.bind(this);
    }

    async authenticateUser(username, password) {
        console.log("Reached service");
        // Get user from the database (calls the persistence layer)
        const bookiUser = await this.users.getUserByUsername(username);

        if (!bookiUser) {
            console.log("User not found.");
            return false;
        }

        console.log("Returned service");

        if (password != bookiUser.User_Password) {
            return false;
        }

        console.log("Creating JWT token...");

        // Get the JWT token
        const token = this.getJWTToken(bookiUser);

        console.log("Returning JWT token...");

        return token;
    }

    getJWTToken(user) {

        console.log("Creating JWT token:", user);
        const token = jwt.sign(
            { userID: user.User_ID, username: user.Username }, process.env.JWT_SECRET, { expiresIn: '1h'}
        );
        console.log("JWT created:", token);
        return token;
    }
}

export default new LoginService(Users);
