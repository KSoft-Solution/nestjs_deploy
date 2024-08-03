import * as nodemailer from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars';
import * as path from 'path';

import { configEnvs } from 'src/config/config';

export class EmailService {
  public generateOTPCode(): number {
    return Math.floor(Math.random() * 999999) + 1;
  }

  private generateHandlebarOptions(): object {
    return {
      viewEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve('src/views'),
        defaultLayout: false,
      },
      viewPath: path.resolve('src/views'),
      extName: '.handlebars',
    };
  }

  private generateMailOptions(userMail: string, otpCode: number): object {
    return {
      from: configEnvs?.mailFrom,
      to: userMail,
      subject: 'UnknownSquad Store: 6-digit code',
      text: `Verify you email.`,
      template: 'email',
      context: { otpCode },
    };
  }

  public async sendEmail(userMail: string, otpCode: number): Promise<void> {
    const mailOptions = this.generateMailOptions(userMail, otpCode);
    const handlebarsOptions = this.generateHandlebarOptions();

    const transport = nodemailer.createTransport({
      host: configEnvs?.mailSMPT,
      //   service: process.env.EMAIL_SERVICE,
      port: configEnvs?.mailPORT,
      secure: true,
      auth: {
        user: configEnvs.mailFrom,
        pass: configEnvs.mailPassword,
      },
    });

    transport.use('compile', hbs(handlebarsOptions));

    await transport.sendMail(mailOptions);
  }
}
