import jwt from 'jsonwebtoken';

class TokenService {
    constructor(secret) {
        this.secret = secret;
    }

    getJWT(data) {
        return jwt.sign(data, this.secret, { expiresIn: '1h' });
    }
}

export default TokenService;