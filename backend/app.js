const express = require('express');
const config = require('./index');

class Main {
    constructor() {
        this.app = express();
    }

    start(port) {
        this.app.listen(port, () => {
            console.log('Server has started on port', port);
        });
    }
}

// Instantiate and start the backend server
const mainApp = new Main();
mainApp.start(config.port);