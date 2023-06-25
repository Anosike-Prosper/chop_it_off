require('dotenv').config();

const PORT: number = parseInt(<string>process.env.PORT) || 3000;
const BASE_URL = process.env.BASE_URL;

const Mongoose_URL = process.env.DB_URL || ''
const JWT_EXPIRY= process.env.JWT_EXPIRES
const SECRET  = process.env.SECRET_KEY || "our secret"
const REDIS= process.env.REDIS_URL

export default {
  PORT,
  
  BASE_URL,
  Mongoose_URL,
  JWT_EXPIRY,
  SECRET,
  REDIS
};




// const DBURL = process.env.NODE_ENV === 'test'? process.env.TEST_DBURL : process.env.DB_URL;
// const PORT = process.env.PORT;

// const NODE_ENV = process.env.NODE_ENV;
// const APP_ENV = 'production';
// const TREBLLE_KEY = process.env.TREBLLE_API_KEY;
// const TREBLLE_PROJECT_ID = process.env.TREBLLE_PROJECT_ID;

// module.exports={
//     DBURL,
//     PORT,
//     SECRET,
//     APP_ENV,
//     NODE_ENV,
//     TREBLLE_KEY,
//     TREBLLE_PROJECT_ID
// }