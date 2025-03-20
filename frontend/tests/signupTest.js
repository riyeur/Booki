import request from 'supertest';
import express from 'express';
import SignupController from '../presentation-layer/SignupController';
import Users from '../persistence-layer/database-functions/Users';




//not sure if any of this is right 



// Mock the Users class - database, 
jest.mock('../persistence-layer/database-functions/Users');

describe('Signup Controller Tests', () => {
  let app;
  
  beforeEach(() => {

    jest.clearAllMocks();
    app = express();
    app.use(express.json());
    app.post('/api/user/signup', SignupController.registerUser);
  });

  test('UT-01: User signup with valid email, password and unique username', async () => {

    Users.getUserByUsername.mockResolvedValue(null);
    Users.createUser.mockResolvedValue(123); 

    const response = await request(app)
      .post('/api/user/signup')
      .send({
        email: 'valid@example.com',
        username: 'uniqueuser',
        password: 'Password123'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Successful, redirecting to login');
    expect(Users.getUserByUsername).toHaveBeenCalledWith('uniqueuser');
    expect(Users.createUser).toHaveBeenCalledWith('valid@example.com', 'uniqueuser', 'Password123');
  });

  test('UT-02: User signup with valid email, password and taken username', async () => {

    Users.getUserByUsername.mockResolvedValue({
      User_ID: 123,
      Username: 'takenuser',
      User_Password: 'hashedPassword'
    });

    const response = await request(app)
      .post('/api/user/signup')
      .send({
        email: 'valid@example.com',
        username: 'takenuser',
        password: 'Password123'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Username is already taken');
    expect(Users.getUserByUsername).toHaveBeenCalledWith('takenuser');
    expect(Users.createUser).not.toHaveBeenCalled();
  });


  test('UT-04: User signup with email, no password and unique username', async () => {
    const response = await request(app)
      .post('/api/user/signup')
      .send({
        email: 'valid@example.com',
        username: 'uniqueuser',
        password: ''
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('All fields are required');
    expect(Users.getUserByUsername).not.toHaveBeenCalled();
  });

  test('UT-05: User signup with no email, password and unique username', async () => {
    const response = await request(app)
      .post('/api/user/signup')
      .send({
        email: '',
        username: 'uniqueuser',
        password: 'Password123'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('All fields are required');
    expect(Users.getUserByUsername).not.toHaveBeenCalled();
  });

  test('UT-08: User signup with email, password and no username', async () => {
    const response = await request(app)
      .post('/api/user/signup')
      .send({
        email: 'valid@example.com',
        username: '',
        password: 'Password123'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('All fields are required');
    expect(Users.getUserByUsername).not.toHaveBeenCalled();
  });

});
