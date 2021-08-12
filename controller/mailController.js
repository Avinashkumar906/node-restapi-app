const mailgun = require("mailgun-js");
const mg = mailgun({apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN});

exports.postMail = (req, res, next) => {
    const data = req.body;
    mg.messages().send(data, (error, body)=> {
        error ? res.status(500).json(error) : res.status(201).json(body)
    });
}

exports.postResetMail = (req, res) => {
    const { user } = req
    res.status(200).json(user);
}

exports.postMails = (req, res) => {
  try{
    const {body:data} = req, result = [];
    if(data.length)
      for (let i =0 ;i < data.length; i++)
        mg.messages().send(data[i], (error, body) => error ? result.push(error) : result.push(body));
    else
      throw new Error('No list found!')
    res.status(200).json(result);
  } catch(err){
    res.status(500).json(err);
  }
}