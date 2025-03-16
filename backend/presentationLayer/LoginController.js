import LoginService from '../business-layer/services/LoginService.js';

// This class handles HTTP requests and responses
class LoginController {

    constructor(loginService) {
        this.loginService = loginService;
        this.loginUser = this.loginUser.bind(this);
    }

    async loginUser(request, response) {
        try {
            // Call the business layer (LoginService)
            const token = await this.loginService.authenticateUser(request.body.username, request.body.password);

            if (!token) {
                response.status(401)
                return response.json({ message: `Login failed` })
            }

            response.status(200)
            return response.json({ message: `Login successful`, token });

        } catch (error) {
            response.status(401);
            return response.json({ message: `Login failed` });
        }
    }
}

export default new LoginController(LoginService);