class SignupService {

    constructor(users) {
        this.users = users;
        this.registerUser = this.registerUser.bind(this);
    }

    async registerUser(email, username, password) {
        console.log(`(SignupService) Check to see if username exists`);

        const existingUsername = await this.users.getUserByUsername(username);
            if (existingUsername)
                {
                return { success: false, message: "Username is already taken" };
            }

        console.log(`(SignupService) Creating user`);
        
        const userId = await this.users.createUser(email, username, password);

        console.log(`(SignupService) Returning after creating the user`);

        if (!userId) {
            return { success: false, message: "Could not create account" };
        }
        return { success: true, message: "Successful, redirecting to login"};
    }
}

export default SignupService;