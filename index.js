const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
require('dotenv').config()
const app = express()

app.use(cors({
  origin: '*',
  credentials: true
}))
app.use(express.json())
app.listen(5000, () => console.log('Server running on port 5000'))

app.route('/contact')
  .post((request, response) => {
    console.log(request.body.name)
    const name = request.body.name
    const email = request.body.email
    const company = request.body.company
    const comment = request.body.comment
    const mail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Portfolio Contact Form Message',
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Company: ${company}</p><p>Message: ${comment}</p>`
    }
    const smtpConfig = {
      host: process.env.HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASSWORD
      }
    }
    const transporter = nodemailer.createTransport(smtpConfig)
    transporter.sendMail(mail, (error) => {
      if (error) {
        response.send(`Failed: ${error}`)
      } else {
        response.send('Buggah worked!')
      }
    })
  })
