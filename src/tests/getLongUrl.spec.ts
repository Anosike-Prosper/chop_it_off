
import request from 'supertest'
import {app} from '../app'
import { userModel } from '../models/user.model'
import { urlModel } from '../models/url.model';
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
    console.log(authToken)
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // describe('/:shortid (GET)', () => {
    it('should redirect a user when they provide a valid short url', async () => {
        console.log('token shows', authToken)
      const response = await request(app)
        .post('/url')
        .send({ longurl: 'https://example1.com' })
        .set('Authorization', `Bearer ${authToken}`);

      const shorturl = response.body.data.shorturl;
      // console.log(typeof shorturl)
      // console.log(response.body)
      // const redirect = await request(app)
        // .get(shorturl)
        // console.log('redirecttttt', redirect)
        // .expect(HttpStatus.MOVED_PERMANENTLY);
    //   expect(redirect.headers.location).toBe(H_URLS[0]);
    });

    it('should return a 404 error when shortid is not valid', async () => {
      const redirect = await request(app)
        .get('http://localhost:5000/ZJ2PxPIekeS_fMteom9Mq')
        // .expect(HttpStatus.NOT_FOUND);
        console.log(redirect)
    //   expect(redirect.body).toEqual({ message: E_LONG_URL_NOT_EXISTS });
    // });
  });
});