import { authenticateUser } from '../business-layer/services/LoginService.js';

export async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        const user = await authenticateUser(username, password);
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
