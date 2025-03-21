import express from 'express';
import config from './index.js';
import loginRoute from './routes/LoginRoute.js';
import signupRoute from './routes/signupRoute.js';
import profileRoute from './routes/ProfileRoute.js';
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
        this.app.use(cors({
            origin: ["http://localhost:3000", "https://booki-production.up.railway.app"],  // Allow both local and deployed frontend
            methods: "GET,POST,PUT,DELETE", 
            allowedHeaders: "Content-Type,Authorization"
        }));
    }

    Routes() {
        this.app.use('/api/user', loginRoute);
        this.app.use('/api/user', signupRoute);
        this.app.use('/api/user', profileRoute);
    }

    Database() {
        connection.connect();
        console.log('Connected to database.');
    }

    start(port) {
        this.app.listen(port);
        console.log(`Server has started on port ${port}`);
    }
}

// Instantiate and start the backend server
const mainApp = new Main();
mainApp.start(config.port);
