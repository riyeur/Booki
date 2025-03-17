import express from 'express';
import config from './index.js';
import loginRoute from './routes/LoginRoute.js';
import llmRoute from './routes/LLMRoutes.js'
import connection from './persistence-layer/connection.js';
import cors from 'cors';

class Main {
    constructor() {
        this.app = express();
        this.ExpressCors();
        this.Routes();
        this.Database();
    }

    ExpressCors() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    Routes() {
        this.app.use('/api/user', loginRoute);
        this.app.use('/api/llm', llmRoute);
    }

    Database() {
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
