import express from 'express';
import config from './index.js';
import loginRoute from './routes/LoginRoute.js';
import connection from './persistence-layer/connection.js';
import cors from 'cors';

class Main {
    constructor() {
        this.app = express();
        this.setupExpressCors();
        this.setupRoutes();
        this.setupDatabase();
    }

    setupExpressCors() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    setupRoutes() {
        this.app.use('/api/user', loginRoute);
    }

    setupDatabase() {
        connection.connect();
        console.log('Connected to database.')
    }

    start(port) {
        this.app.listen(port);
        console.log('Server has started.')
    }
}

// Instantiate and start the backend server
const mainApp = new Main();
mainApp.start(config.port);
