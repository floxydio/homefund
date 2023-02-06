import nodemailer from 'nodemailer'

export async function MailService(from: String, to: String, subject: String, html: String) {

    //Create Account
    let testAccount = await nodemailer.createTestAccount();

    //Create Connection
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", //Change When SMTP Host Ready
        port: 587, //Change When SMTP Port Ready
        secure: false,
        auth: {
            user: "kontrakdanadev@gmail.com",
            pass: "lewuwfnmumrcogjd",
        }
    })
    await transporter.sendMail({
        from: `"KontrakDana - DEV" <${from}>`, //sender Email
        to: `${to}`,//list of receivers
        subject: `${subject}`, //Subject Line
        html: `${html}` //HTML Body
    })
}

