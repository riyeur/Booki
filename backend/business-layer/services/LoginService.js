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
        console.log(`(LoginService) Authenticating user`);

        // Get user from the database (calls the persistence layer)
        const bookiUser = await this.users.getUserByUsername(username);

        console.log(`(LoginService) Authenticated user: `, bookiUser);

        if (!bookiUser) {
            return false;
        }

        if (password != bookiUser.User_Password) {
            return false;
        }

        // Get the JWT token
        const token = this.getJWTToken(bookiUser);

        console.log(`(LoginService) Returning the token`);

        return token;
    }

    getJWTToken(user) {

        if (!process.env.JWT_SECRET) {
            console.log("Missing JWT_SECRET environment variable");
        }

        const token = jwt.sign(
            { userID: user.User_ID, username: user.Username }, process.env.JWT_SECRET, { expiresIn: '1h'}
        );

        return token;
    }
}

export default new LoginService(Users);
