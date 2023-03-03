const nodemailer = require('nodemailer')

module.exports = async (email, subject, text, link) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSEMAIL,
            },
        })

        await transporter.sendMail({
            from: 'ffwovangga1@gmail.com',
            to: email,
            subject: subject,
            text: text,
            html: link
        })
    } catch (error) {
        console.log(error)
        return error
    }
}