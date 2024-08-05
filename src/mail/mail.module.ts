import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';

import { configEnvs } from 'src/config/config';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: configEnvs.mailSMPT,
          secure: false,
          auth: {
            user: configEnvs.mailFrom,
            pass: configEnvs.mailPassword,
          },
        },
        defaults: {
          from: `"No Reply" <${configEnvs.mailFrom}>`,
        },

        template: {
          dir: process.cwd() + '/src/mail/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
