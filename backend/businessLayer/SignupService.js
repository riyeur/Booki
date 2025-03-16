// This is a business logic class that checks to see if the username, email and password are valid (characters are valid, email has '@', etc.)
// This calls the persistence layer class with the SQL function to save the data if it is valid
import Users from '../persistence-layer/getUsers.js'; // Import the instance of Users

class SignupService {
    constructor() {
        // No need for this.users = new Users(); because Users is already exported as an instance
        this.users = Users;
    }

    async registerUser(email, username, password) {
        // Check if user with this email already exists
        const existingUser = await this.users.getUserByEmail(email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Check if username is already taken
        const existingUsername = await this.users.getUserByUsername(username);
        if (existingUsername) {
            throw new Error('Username is already taken');
        }

        // Create the user in the database
        const userId = await this.users.createUser(email, username, password);
        
        return { userId };
    }
}

export default SignupService;
