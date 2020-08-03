const mailgun = require("mailgun-js");
const mg = mailgun({apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN});

exports.postMail = (req, res, err) => {
    const data = req.body;
    mg.messages().send(data, (error, body)=> {
        error ? res.status(500).json(error) : res.status(201).json(body)
    });
}