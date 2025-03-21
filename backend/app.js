import express from 'express';
import config from './index.js';
import connection from './persistence-layer/connection.js';
import cors from 'cors';

/* CHANGE THIS */
import profileRoute from './routes/ProfileRoute.js';
import llmRoute from './routes/LLMRoutes.js';
import resultRoute from './routes/ResultRoute.js';

/* LOGIN */
import createLoginRoute from './routes/LoginRoute.js';
import LoginController from './presentation-layer/LoginController.js';
import TokenService from './business-layer/services/TokenService.js';
import LoginService from './business-layer/services/LoginService.js';
import Users from './persistence-layer/database-functions/Users.js';

/* SIGNUP */
import createSignupRoute from './routes/signupRoute.js';
import SignupController from './presentation-layer/SignupController.js';
import SignupService from './business-layer/services/SignupService.js';

class Main {
    constructor() {
        this.app = express();
        this.connection = connection;
        this.ExpressCors();
        this.makeBackendNotSleep();
        this.Instantiate();
        this.Routes();
        this.Database();
    }

    ExpressCors() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    Routes() {
        this.app.use('/api/user', createLoginRoute(this.loginController));
        this.app.use('/api/user', createSignupRoute(this.signupController));
        this.app.use('/api/user', profileRoute);
        this.app.use('/api/llm', llmRoute);
        this.app.use('/api/book', resultRoute);
    }

    Instantiate() {
        /* LOGIN */
        this.users = Users;
        this.tokenService = new TokenService(process.env.JWT_SECRET);
        this.loginService = new LoginService(this.users, this.tokenService);
        this.loginController = new LoginController(this.loginService);

        /* SIGN UP */
        this.signupService = new SignupService(this.users);
        this.signupController = new SignupController(this.signupService);
    }

    Database() {
        this.connection.getConnection().then(connect => {
            console.log('Connected to database.');
            connect.release();
        })
        .catch(error => {
            console.log('Database connection failed:', error);
        });
    }

    // Backend was failing after inactivity => send ping so that it does not stop
    makeBackendNotSleep() {
        this.app.get('/ping', (request, response) => {
            response.send('Backend is active');
        });
    }

    start(port) {
        this.app.listen(port);
        console.log(`Server has started on port ${port}`);
    }
}

// Instantiate and start the backend server
const mainApp = new Main();
mainApp.start(config.port);