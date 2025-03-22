/**
 * This file defines the TokenService class, which is responsible for generating JSON Web Tokens (JWTs).
 * The 'getJWT' method takes the provided data and signs it with the given secret, creating a JWT.
 * The token is set to expire in one hour (1h). 
 */


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