import request from 'supertest'
import {app} from '../../app'
import { userModel } from '../../models/user.model'
import mongoose from "mongoose";

describe('', ()=>{
  beforeAll(async () => {
    await userModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await userModel.deleteMany({});
    
  });


  describe("User registration", () => {
  

 

    test("should register a new user", async () => {
      const user = {
          username:"prosper",
        email: "johndoe@example.com",
        password: "password123",
      };
      await request(app).post("/auth/signup").send(user);
    

      const response = await request(app).post('/auth/login')
      .send({
        email: 'johndoe@example.com',
        password: 'password123',
      })

   
    
    expect(response.body).toHaveProperty('token');
    expect(response.body.token).toBeDefined();

    });

    it('should throw a 400 error for incorrect credentials', async () => {
      // Make a POST request to /auth/signin with incorrect credentials
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'john@example.com',
          password: 'wrongpassword',
        })
        
        expect(response.statusCode).toBe(401)

      // Assert the response
      expect(response.body).toHaveProperty('message', 'Incorrect Email or Password');
    });
  
    it('should throw a 400 error when user does not exist', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'john@example.com',
          password: 'wrongpassword',
        })

    
        expect(response.statusCode).toBe(401)

  
      expect(response.body).toHaveProperty('message', 'Incorrect Email or Password');
    });
  
  });
  
})

