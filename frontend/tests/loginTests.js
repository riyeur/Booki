import request from 'supertest';
import express from 'express';
import LoginController from '../presentation-layer/LoginController';
import Users from '../persistence-layer/database-functions/Users';
import jwt from 'jsonwebtoken';


//not sure if any of this is right 




// Mock the dependencies
jest.mock('../persistence-layer/database-functions/Users');
jest.mock('jsonwebtoken');

describe('Login Controller Tests', () => {
  let app;
  
  beforeEach(() => {

    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-jwt-secret';
    jwt.sign.mockReturnValue('mocked-jwt-token');
    app = express();
    app.use(express.json());
    app.post('/api/user/login', LoginController.loginUser);
  });

  test('UT-09: User logs in with valid username and password', async () => {
    
    const mockUser = {
      User_ID: 123,
      Username: 'validuser',
      User_Password: 'correctPassword'
    };
    
    
    Users.getUserByUsername.mockResolvedValue(mockUser);
    
    const response = await request(app)
      .post('/api/user/login')
      .send({
        username: 'validuser',
        password: 'correctPassword'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.token).toBe('mocked-jwt-token');
    expect(Users.getUserByUsername).toHaveBeenCalledWith('validuser');
    expect(jwt.sign).toHaveBeenCalledWith(
      { userID: 123, username: 'validuser' },
      'test-jwt-secret',
      { expiresIn: '1h' }
    );
  });

  test('UT-10: User logs in with valid username and invalid password', async () => {
   
    const mockUser = {
      User_ID: 123,
      Username: 'validuser',
      User_Password: 'correctPassword'
    };

    Users.getUserByUsername.mockResolvedValue(mockUser);
    
    const response = await request(app)
      .post('/api/user/login')
      .send({
        username: 'validuser',
        password: 'wrongPassword'
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
    expect(Users.getUserByUsername).toHaveBeenCalledWith('validuser');
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  test('UT-11: User logs in with invalid username and password', async () => {
    Users.getUserByUsername.mockResolvedValue(null);
    
    const response = await request(app)
      .post('/api/user/login')
      .send({
        username: 'invaliduser',
        password: 'anyPassword'
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
    expect(Users.getUserByUsername).toHaveBeenCalledWith('invaliduser');
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  test('UT-12: User logs in with valid username and empty password', async () => {
    const response = await request(app)
      .post('/api/user/login')
      .send({
        username: 'validuser',
        password: ''
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Username and password are required');
    expect(Users.getUserByUsername).not.toHaveBeenCalled();
  });

  test('UT-13: User logs in with empty username and password', async () => {
    const response = await request(app)
      .post('/api/user/login')
      .send({
        username: '',
        password: 'anyPassword'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Username and password are required');
    expect(Users.getUserByUsername).not.toHaveBeenCalled();
  });

});
