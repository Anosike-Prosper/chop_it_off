import request from 'supertest'
import {app} from '../app'
import { userModel } from '../models/user.model'
import { urlModel } from '../models/url.model';
import mongoose from "mongoose";



describe('UrlController (e2e)', () => {
 

    let authToken1: string;
  let authToken2: string;

  beforeAll(async () => {
    await urlModel.deleteMany({});
    await userModel.deleteMany({});
  });

  beforeEach(async () => {
    await urlModel.deleteMany({});
    await userModel.deleteMany({});

//     /*signup and login for user 1*/
    await request(app).post('/auth/signup').send({
        username: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      })

    const login = await request(app)
      .post('/auth/login')
      .send({
        email: 'john@example.com',
        password: 'password',
      });
    authToken1 = login.body.token;

    console.log('the token 1', authToken1)

//     /*signup and login for user 2*/
    await request(app).post('/auth/signup').send({
        email: 'test@example.com',
        password: 'password',
        username: 'test',
      })

    const loginRes = await request(app).post('/auth/login')
      .send( {email: 'test@example.com',
      password: 'password'});
    authToken2 = loginRes.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close()
  });
//   describe('/url/ (GET)', () => {

    // console.log('-------token 1 is here', authToken1)
    it('should fetch all url shortened by a user1', async () => {
        console.log('isnt token one also here', authToken1)
//       /*URL 1*/
      await request(app)
        .post('/url')
        .set('Authorization', `Bearer ${authToken1}`)
        .send({ longurl: 'https://example1.com' });

//       /*URL 2*/
      await request(app)
        .post('/url')
        .set('Authorization', `Bearer ${authToken1}`)
        .send({ longurl: 'https://example2.com' });

//       /*URL 4*/
      await request(app)
        .post('/url')
        .set('Authorization', `Bearer ${authToken1}`)
        .send({ longurl: 'https://example6.com' });
      const response = await request(app)
        .get('/url')
        .set('Authorization', `Bearer ${authToken1}`)
        console.log(response)
        expect(response.statusCode).toBe(200)
      expect(response.body.count).toBe(3);
      expect(response.body).toHaveProperty('data');

// console.log('i dey here', response.body)
    });
    it('should fetch all url shortened by a user2', async () => {
//       /*URL 1*/
      await request(app)
        .post('/url')
        .set('Authorization', `Bearer ${authToken2}`)
        .send({ longurl: 'https://example3.com' });

//       /*URL 2*/
      await request(app)
        .post('/url')
        .set('Authorization', `Bearer ${authToken2}`)
        .send({ longurl: 'https://example4.com' },);

//       /*URL 3*/
      await request(app)
        .post('/url')
        .set('Authorization', `Bearer ${authToken2}`)
        .send({ longurl: 'https://example5.com' });

//       /*URL 3*/
      await request(app)
        .post('/url')
        .set('Authorization', `Bearer ${authToken2}`)
        .send({ longurl: 'https://example6.com' });

      const response = await request(app)
        .get('/url')
        .set('Authorization', `Bearer ${authToken2}`)
        expect(response.statusCode).toBe(200);
      expect(response.body.count).toBe(4);
      expect(response.body).toHaveProperty('data');
    // console.log('finally ooo',response.body)
    });
  });
// });