export async function authenticateUser(username, password) {
    // Simulating user authentication (replace this with DB logic)
    const mockUser = { username: 'admin', password: 'password123' };

    if (username === mockUser.username && password === mockUser.password) {
        return { username: mockUser.username };
    }
    return null;
}
