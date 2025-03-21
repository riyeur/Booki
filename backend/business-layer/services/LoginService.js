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
