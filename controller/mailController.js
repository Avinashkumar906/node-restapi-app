const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.postMail = (req, res, err) => {
    const msg = {
        to: process.env.DEFAULT_EMAIL,
        from: req.body.email,
        subject: req.body.subject,
        text: 'Welcome!',
        html: `<strong>Mail from ${req.body.name}</strong><br>
        <p>${req.body.message}</p>`,
    };
    sgMail.send(msg).then(
        (result) => {
            res.setHeader('Content-Type', 'application/json')
            res.status(202).json(result)
        }
    ).catch(
        (err) => {
            res.setHeader('Content-Type', 'application/json')
            res.status(400).json(err)
        }
    )
}
exports.postToMarble = (req, res, err)=> {
    const msg = {
        to: process.env.DEFAULT_EMAIL,
        from: req.body.email,
        subject: req.body.subject,
        text: req.body.text,
        html: `<strong>Mail from ${req.body.name}</strong><br>
        <p><strong>${req.body.message}</strong></p>
        <p><strong>Warm regards</strong><br><strong>MArble Group</strong></p>`,
    };
    sgMail.send(msg).then(
        (result) => {
            res.setHeader('Content-Type', 'application/json')
            res.status(202).json(result)
        }
    ).catch(
        (err) => {
            res.setHeader('Content-Type', 'application/json')
            res.status(400).json(err)
        }
    )
}
exports.postToCharity = (req, res, err) => {
    const msg = {
        to: process.env.DEFAULT_EMAIL,
        from: req.body.email,
        subject: req.body.subject,
        text: 'and easy to do anywhere, even with Node.js',
        html: `<strong>Mail from ${req.body.name}</strong><br>
        <p>${req.body.message}</p>`,
    };
    sgMail.send(msg)
    .then(
    (result) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(202).json(result)
    })
    .catch(
    (err) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(400).json(err)
    })
}