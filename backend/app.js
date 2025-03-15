import express from 'express';
import config from './index.js';
import loginRoute from './routes/LoginRoute.js';
import cors from 'cors';

class Main {
    constructor() {
        this.app = express();
        this.setupMiddleware();
        this.setupRoutes();
    }

    setupMiddleware() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    setupRoutes() {
        this.app.use('/api/user', loginRoute);
    }

    start(port) {
        this.app.listen(port, () => {
            console.log(`Server has started on port ${port}`);
        });
    }
}

// Instantiate and start the backend server
const mainApp = new Main();
mainApp.start(config.port);

