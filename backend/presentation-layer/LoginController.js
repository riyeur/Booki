import LoginService from '../business-layer/services/LoginService.js';

// This class handles HTTP requests and responses
class LoginController {

    constructor(loginService) {
        this.loginService = loginService;
        this.loginUser = this.loginUser.bind(this);
    }

    async loginUser(request, response) {
        try {
            console.log("Reached controller");
            // Call the business layer (LoginService)
            const token = await this.loginService.authenticateUser(request.body.username, request.body.password);

            console.log("Return from controller");
            if (!token) {
                return response.status(401).json({});
            }

            console.log("Checked for no token");

            return response.status(200).json({ token });

        } catch (error) {
            console.error(`Error`);
            return response.status(401).json({});
        }
    }
}

export default new LoginController(LoginService);