const nodemailer = require("nodemailer");

async function sendMail(emailTo, interviewDetails) {
    console.log(emailTo, " isko bhejna hai ");
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
        let info = await transporter.sendMail({
            from : `Interview Manager Admin`,
            to: emailTo,
            subject: "Interview Invitation",
            text: `${interviewDetails.title}\nStarts: ${interviewDetails.startTime}\nEnds: ${interviewDetails.endTime}\nParticipants: ${interviewDetails.participants}`,
            html: ''
        });
        console.log(info);
    } catch(err) {
        console.log(err);
        console.log("couldn't send the email");
    }
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

module.exports = function mailParticipants(participants, interviewDetails) {
    const participantsList = participants.split(' ');
    participantsList.forEach(participant => {
        if(validateEmail(participant)) {
            sendMail(participant, interviewDetails);
        }
    });
}