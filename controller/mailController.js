const mailgun = require("mailgun-js");
const mg = mailgun({apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN});

exports.postMail = (req, res, err) => {
    const data = {
        from: 'Excited User<me@samples.mailgun.org>',
        to: 'avinashkumar906@gmail.com',
        subject: 'Hello',
        text: 'Testing some Mailgun awesomness!'
    };
    mg.messages().send(data, function (error, body) {
        res.json({error,body});
    });
}