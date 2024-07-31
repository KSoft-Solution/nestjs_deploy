import * as dotenv from 'dotenv';
dotenv.config();

const {
  MONGO_URL,
  PORT,
  JWT_EXPIRES_IN,
  JWT_SECRET_KEY,
  //   MAIL_HOST,
  //   MAIL_USER,
  //   MAIL_PASSWORD,
  //   MAIL_FROM,
  //   CLD_CLOUD_NAME,
  //   CLD_API_KEY,
  //   CLD_API_SECRET,
} = process.env;

export const configEnvs = {
  mongoURL: MONGO_URL,
  port: PORT,
  jwt_expires_in: JWT_EXPIRES_IN,
  jwt_secret_key: JWT_SECRET_KEY,
  //   mailSMPT: MAIL_HOST,
  //   mailUser: MAIL_USER,
  //   mailPassword: MAIL_PASSWORD,
  //   mailFrom: MAIL_FROM,
  //   cloudinaryName: CLD_CLOUD_NAME,
  //   cloudinaryKey: CLD_API_KEY,
  //   cloudinarySecretKey: CLD_API_SECRET,
};
