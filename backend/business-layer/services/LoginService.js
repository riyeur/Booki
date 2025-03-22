/**
 * This file defines the LoginService class, which handles user authentication logic.
 * The 'authenticateUser' method checks if a user exists in the database by their username and compares the provided password with the stored password.
 * If the username or password is incorrect, it returns false.
 * If the credentials are valid, it generates and returns a JWT token containing the user's ID and username for further authentication/authorization processes.
 * The class interacts with the persistence layer to retrieve user data and the TokenService to generate JWTs.
 */

import dotenv from 'dotenv';

dotenv.config();

class LoginService {

    constructor(users, token) {
        this.users = users;
        this.token = token;
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
        const token = this.token.getJWT({userID: bookiUser.User_ID, username: bookiUser.Username});

        console.log(`(LoginService) Returning the token`);

        return token;
    }
}

export default LoginService;
