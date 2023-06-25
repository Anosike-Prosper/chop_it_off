import request from 'supertest'
import {app} from '../app'
import { userModel } from '../models/user.model'
import mongoose from "mongoose";

describe('', () => {
    beforeAll(async () => {
        await userModel.deleteMany({});
      });
    
      afterAll(async () => {
        await userModel.deleteMany({})
        await mongoose.connection.close();
      });
    
      beforeEach(async () => {
        await userModel.deleteMany({});
        
      });
    
  

  describe('/auth/signup (POST)', () => {
    it('should register a new user', async () => {
      const  createUser = {
        username: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      };

      const response = await request(app)
        .post('/auth/signup')
        .send(createUser)

        console.log(response.body)

        
        expect(response.statusCode).toBe(201)

      expect(response.body.data.username).toBe(createUser.username);
      expect(response.body.data.email).toBe(createUser.email);
    //   expect(response.body.data.password).toBeUndefined();
    });

    it('should throw an error when email already exists', async () => {
      const existingUser = {
        username: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password',
      };

      // Create an existing user
      await userModel.create(existingUser);

      const createUser= {
        name: 'John Doe',
        email: 'jane@example.com', // Use existing email
        password: 'password',
      };

      const response = await request(app)
        .post('/auth/signup')
        .send(createUser)
        console.log(response.body)
        console.log(response.statusCode)
        expect(response.statusCode).toBe(409)

      expect(response.body.message).toBe('user with this email already exist');
    });
  });
});