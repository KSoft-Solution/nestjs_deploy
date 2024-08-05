import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { SessionOptions } from 'express-session';

import { configEnvs } from 'src/config/config';

export const connectDB = (
  configService: ConfigService,
): MongooseModuleOptions => {
  const dbPassword = configService.get<string>('MONGODB_PASSWORD');
  const dbName = configService.get<string>('MONGODB_DATABASE_NAME');

  const mongodbUri = `mongodb+srv://kanhasahu955902:${dbPassword}@cluster0.8qxodw7.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;
  return {
    uri: mongodbUri,
    autoIndex: false,
  };
};

export const corsConfig = (): CorsOptions => ({
  origin: configEnvs.CLIENT_URL,
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200,
});

export const sessionConfig = (MongoDBStore: any): SessionOptions => ({
  secret: configEnvs.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  cookie:
    configEnvs.NODE_ENV === 'production'
      ? {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          maxAge: 3 * 24 * 60 * 60 * 1000,
        }
      : { maxAge: 3 * 24 * 60 * 60 * 1000 },
  store: new MongoDBStore({
    uri: configEnvs.mongoURL,
    collection: 'sessions',
  }),
});
