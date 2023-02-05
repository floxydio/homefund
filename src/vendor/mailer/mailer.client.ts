import nodemailer from 'nodemailer'

export async function MailService (){

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

    //Send Email with defined transport object 
    let message = await transporter.sendMail({
        from: '"Fred Foo" <foo@example.com>', //sender Email
        to: "bar@example.com, baz@example.com",//list of receivers
        subject: "Hello", //Subject Line
        text: "Hello World?", //Plain Text Body
        html: "<b>Hello World?<b>" //HTML Body
    })

    console.log("Message sent: %s", message.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

MailService().catch(console.error)