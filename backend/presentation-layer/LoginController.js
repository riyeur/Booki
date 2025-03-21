// This class handles HTTP requests and responses
class LoginController {

    constructor(loginService) {
        this.loginService = loginService;
        this.loginUser = this.loginUser.bind(this);
    }

    async loginUser(request, response) {
        try {
            
            console.log(`(LoginController) Calling LoginService to authenticate the user`);

            const token = await this.loginService.authenticateUser(request.body.username, request.body.password);

            console.log(`(LoginController) Returned from LoginService with token/no token`);

            if (!token) {
                return response.status(401).json({});
            }

            console.log(`(LoginController) Returning with token`);

            return response.status(200).json({ token });

        } catch (error) {
            return response.status(401).json({});
        }
    }
}

export default LoginController;