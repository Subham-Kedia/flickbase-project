const nodeMailer = require("nodemailer")
const MailGenerator = require("mailgen")

let transporter = nodeMailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
})

const registerEmail = async (userEmail, user) => {
  try {
    const token = user.generateEmailVerificationToken()
    const mailGenerator = new MailGenerator({
      theme: "default",
      product: {
        name: "Flickbase",
        link: `${process.env.EMAIL_MAIN_URL}`,
      },
    })
    const email = {
      body: {
        name: user.fullName ? user.fullName : userEmail,
        intro: "Welcome to Flickbase We are very exited to have you onboard",
        action: {
          instructions:
            "This link is valid for next 30 minutes. To validaate your account, please click here:",
          button: {
            color: "#1a73e8",
            text: "Validate your account",
            link: `${process.env.SITE_DOMAIN}verification?token=${token}`,
          },
        },
        outro:
          "Need help, or have any questions? Just reply to this email, We would love to help.",
      },
    }
    const emailBody = mailGenerator.generate(email)
    const message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Email Verification for Flickbase",
      html: emailBody,
    }

    await transporter.sendMail(message)
    return true
  } catch (error) {
    throw error
  }
}

module.exports = {registerEmail}
