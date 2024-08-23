let nodemailer = require("nodemailer");

//from
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "chandegarajignesh00@gmail.com",
    pass: "jjgermugmuqeqcoz",
  },
});

let sendEmail = (to, subject, data) => {
  return transporter.sendMail({
    from: '"test mail 👻" <chandegarajignesh00@gmail.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: data, // plain text body
  });
};

module.exports = sendEmail;



