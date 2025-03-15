import { authenticateUser } from '../business-layer/services/LoginService.js';

export async function loginUser(request, response) {
    try {
        const { username, password } = request.body;
        const user = await authenticateUser(username, password);
        
        if (!user) {
            return response.status(401).json({ message: 'Invalid credentials' });
        }

        response.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        response.status(500).json({ message: 'Server error', error: error.message });
    }
}
