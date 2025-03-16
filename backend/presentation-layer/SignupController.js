// This should get all the sign-up requests (API requests) and then call the LoginService.js in the business layer to validate the request
// This is technically a part of the presentation layer along with the React code


import SignupService from '../business-layer/SignupService.js';

class SignupController {
    constructor() {
        this.signupService = new SignupService();
    }

    registerUser = async (req, res) => {
        try {
            const { email, username, password } = req.body;
            
            // Validate input
            if (!email || !username || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            
            // Call service to handle registration logic
            const result = await this.signupService.registerUser(email, username, password);
            
            return res.status(201).json({
                message: 'User registered successfully',
                userId: result.userId
            });
        } catch (error) {
            console.error('Error in registerUser:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default SignupController;