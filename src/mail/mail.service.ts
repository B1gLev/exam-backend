import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async sendMail(to: string, subject: string, text: string) {
        try {
            const info = await this.transporter.sendMail({
                from: '"Sun GYM" <info@sungym.szakdoga.net>',
                to,
                subject: "Új jelszó létrehozása",
                html: `<p>A hivatkozásra kattintva új jelszót hozhatsz létre a fiókodhoz.</p>
                       <p><a href="${text}" style="color: blue;">Új jelszó létrehozása</a></p>
                       <p>Ha nem kértél új jelszót, nyugodtan törölheted ezt az e-mailt.</p>`
            });

            console.log('Email sent: ', info.messageId);
            return info;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}
