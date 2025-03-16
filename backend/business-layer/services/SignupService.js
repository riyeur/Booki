// This is a business logic class that checks to see if the username, email and password are valid (characters are valid, email has '@', etc.)
// This calls the persistence layer class with the SQL function to save the data if it is valid
import Users from '../../persistence-layer/database-functions/Users.js';

class SignupService {
    constructor(users) {
        this.users = users;
        this.registerUser = this.registerUser.bind(this);
    }

    async registerUser(email, username, password) {
        const userId = await this.users.createUser(email, username, password);

        if (!userId) {
            return false;
        }
        
        return { userId };
    }
}

export default new SignupService(Users);