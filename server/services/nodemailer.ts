import nodemailer from 'nodemailer';
import keys from '../config/keys';

export const transporter = nodemailer.createTransport({
    host: keys.MAIL_HOST,
    port: keys.MAIL_PORT,
});