// Layered architecture must have a main class to instantiate everything. This will act as that class

import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 3000
};

export default config;