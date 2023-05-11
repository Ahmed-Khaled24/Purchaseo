import { transporter } from "../services/nodemailer";
import ErrorWithStatusCode from "./classes/ErrorWithStatusCode";

export async function sendMail(resetPasswordLink: string, email: any) {
    let obj = await transporter.sendMail({
        from: "Fred Fooo <no-reply@localhost>",
        to: email,
        subject: "Purchaso password reset",
        html: `Click to <a href="${resetPasswordLink}">Reset Password</a>`,
    });
    if (!obj) {
        throw new ErrorWithStatusCode("Error sending email", 400);
    }
    return obj;
}
