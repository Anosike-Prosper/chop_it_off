import request from 'supertest'
import {app} from '../app'
import { userModel } from '../models/user.model'
import { urlModel } from '../models/url.model';
import mongoose from "mongoose";


let authToken: string;

describe('UrlController (e2e)', () => {
  


  beforeAll(async () => {

  
    // await userModel.deleteMany({});
    // await urlModel.deleteMany({})
  });

  beforeEach(async () => {
    await urlModel.deleteMany({});
    await userModel.deleteMany({});

    await request(app).post('/auth/signup').send({
        username: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      });

    const login = await request(app)
      .post('/auth/login')
      .send({
        email: 'john@example.com',
        password: 'password',
      });
    
    authToken = login.body.token;

    console.log('tokennnnnnnnnnn',authToken)

  });

  

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should access authenticated endpoint successfully', async () => {
    const response = await request(app)
      .post('/url')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ longurl: 'https://example1.com' })

    //   console.log('shhhhhhhhh',response.body)
      expect(response.statusCode).toBe(201)
    expect(response.body.data).toHaveProperty('longurl');
    expect(response.body.data).toHaveProperty('shorturl');
    expect(response.body.data).toHaveProperty('shortId');
    expect(response.body.data).toHaveProperty('ownerId');
    expect(response.body.data).toHaveProperty('_id');
  });

  it("should return a 401 error if user isn't authorized", async () => {
    const response= await request(app)
      .post('/url')
      .send({ longurl: 'https://example1.com' })

      
      
      expect(response.statusCode).toBe(401)
  });

  it('should return a 409 error code when a URL has already been shortened', async () => {
    await request(app)
      .post('/url')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ longurl: 'https://example1.com' });

    const response = await request(app)
      .post('/url')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ longurl: 'https://example1.com' })

      expect(response.statusCode).toBe(409)
// /       .expect(HttpStatus.CONFLICT);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Long url already exist');
console.log('nawaaaaaaaa', response.body)
  });
});