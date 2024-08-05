import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as passport from 'passport';
const MongoDBStore = require('connect-mongodb-session')(session);

import { AppModule } from 'src/app.module';
import { configEnvs } from 'src/config/config';
import { corsConfig, sessionConfig } from 'src/helper/config.helper';
import { join } from 'path';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.set('trust proxy', 1); 
  app.setGlobalPrefix('api');
  app.enableCors(corsConfig());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      always: true,
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(
    session({
      secret: 'SECRET',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.use(session(sessionConfig(MongoDBStore)));
  app.use(passport.initialize());
  app.use(passport.session());
  const config = new DocumentBuilder()
    .setTitle('Elecload India')
    .setDescription(
      `Elecload India - Ecommerce API
      <h2>Looking for the graphql api?</h2>
      Go to <a href="/graphql" target="_blank">/graphql</a>.
      Or,
      You might also need to use the <a target="_blank" href="https://studio.apollographql.com/sandbox/explorer?endpoint=http://localhost:3000/graphql&document=query users{users{ uid }}
      ">Apollo explorer</a> for a greater experience.
      `,
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
  await app.listen(configEnvs.port, () =>
    console.log(
      `Server is running on port http://localhost:${configEnvs.port}/api/docs`,
    ),
  );
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
