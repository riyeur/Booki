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
        // Get users from the database (calls the persistence layer)
        const bookiUser = await this.users.getUserByUsername(username);

        if (password != bookiUser.User_Password) {
            return false;
        }

        // Get the JWT token
        const token = this.getJWTToken(bookiUser);

        return token;
    }

    getJWTToken(user) {
        const token = jwt.sign(
            { userID: user.User_ID, username: user.Username }, process.env.JWT_SECRET, { expiresIn: '1h'}
        );

        return token;
    }
}

export default new LoginService(Users);
