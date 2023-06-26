
import request from 'supertest'
import {app} from '../../app'
import { userModel } from '../../models/user.model'
import { urlModel } from '../../models/url.model';
import mongoose from "mongoose";

describe('UrlController (e2e)', () => {
  
  let authToken: string;

  beforeAll(async () => {
    await urlModel.deleteMany({});
    await userModel.deleteMany({});
  });

  beforeEach(async () => {
    await urlModel.deleteMany({});
    await userModel.deleteMany({});

    /*signup and login for user 1*/
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
      })
    authToken = login.body.token;
    
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // describe('/:shortid (GET)', () => {
    it('should redirect a user when they provide a valid short url', async () => {
        console.log('token shows', authToken)
      const response = await request(app)
        .post('/url/')
        .send({ longurl: 'https://example1.com' })
        .set('Authorization', `Bearer ${authToken}`);
        

        

      const shortId = response.body.data.shortId;
      
      

        const redirect = await request(app)
          .get(`/url/${shortId}`)
          .set("user-agent", "supertest")
          .expect(302)
          
      
    
    })

  
});