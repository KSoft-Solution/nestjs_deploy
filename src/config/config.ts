import * as dotenv from 'dotenv';
dotenv.config();

const {
  MONGO_URL,
  PORT,
  JWT_EXPIRES_IN,
  JWT_SECRET_KEY,
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_FROM,
  MAIL_PORT,
  DB_NAME,
  MAIL_SERVICE,
  REFRESH_TOKEN,
  CLIENT_ID,
  CLIENT_SECRET,
  ACCESS_TOKEN,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLIENT_URL,
  SESSION_KEY,
  NODE_ENV
} = process.env;

export const configEnvs = {
  mongoURL: MONGO_URL,
  port: PORT,
  jwt_expires_in: JWT_EXPIRES_IN,
  jwt_secret_key: JWT_SECRET_KEY,
  mailSMPT: MAIL_HOST,
  mailPORT: MAIL_PORT,
  mailPassword: MAIL_PASSWORD,
  mailFrom: MAIL_FROM,
  databaseName: DB_NAME,
  mailService: MAIL_SERVICE,
  cloudinaryName: CLOUDINARY_NAME,
  cloudinaryKey: CLOUDINARY_API_KEY,
  cloudinarySecretKey: CLOUDINARY_API_SECRET,
  REFRESH_TOKEN,
  NODE_ENV,
  CLIENT_ID,
  ACCESS_TOKEN,
  CLIENT_SECRET,
  CLIENT_URL,
  SESSION_KEY,
};
