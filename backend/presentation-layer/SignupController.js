/**
 * Controller class responsible for handling user registration requests.
 */

class SignupController {

    constructor(signupService) {
        this.signupService = signupService;
        this.registerUser = this.registerUser.bind(this);
    }

    registerUser = async (request, response) => {
        try {
            const { email, username, password } = request.body;

            console.log(`(SignupController) Checking to see if email, username and password are filled out`);

            if (!email || !username || !password) {
                return response.status(400).json({ message: 'All fields are required' });
            }

            console.log(`(SignupController) Calling SignupService to register the user`);
            
            const result = await this.signupService.registerUser(email, username, password);

            console.log(`(SignupController) Returned from LoginService with userID`);
            
            if (!result.success) {
                return response.status(400).json({ message: result.message });
            }

            return response.status(201).json({ message: result.message, userId: result.userId });

        } catch (error) {
            return response.status(500).json({ message: `Registration failed` });
        }
    }
}

export default SignupController;