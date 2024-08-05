import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendUserConfirmation(email: string, otpCode: number) {
    await this.mailerService.sendMail({
      text: `Verify you email.`,
      to: email,
      subject: 'Welcome to Elecload Ecommerce App! Confirm your Email',
      template: 'email',
      context: { otpCode },
    });
  }
}
