// This should get all the sign-up requests (API requests) and then call the LoginService.js in the business layer to validate the request
// This is technically a part of the presentation layer along with the React code
import SignupService from '../business-layer/services/SignupService.js';

class SignupController {

    constructor(signupService) {
        this.signupService = signupService;
        this.registerUser = this.registerUser.bind(this);
    }

    registerUser = async (request, response) => {
        try {
            const { email, username, password } = request.body;

            if (!email || !username || !password) {
                response.status(400)
                return response.json({ message: 'All fields are required' });
            }
            
            const result = await this.signupService.registerUser(email, username, password);

            response.status(201)
            return response.json({ message: `Registration successful`, userId: result.userId });

        } catch (error) {
            response.status(500);
            return response.json({ message: `Registration failed` });
        }
    }
}

export default new SignupController(SignupService);