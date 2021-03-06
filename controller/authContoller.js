const User = require('../model/profile')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const log = require('log-to-file')

exports.signIn = async (req,res,next)=>{
    try {
        const email = req.body.email.toLowerCase()
        const user = await User.findOne({email:email},{images:0,taskBoards:0,tasks:0,resettoken:0}).lean();
        //checking existance of user
        if(user){
            let result = await  bcrypt.compare(req.body.password,user.password)
            //checking password
            if(result){
                log(`User Logged in : ${user.email}<br/>`)
                let token = jwt.sign({role:user.role,email:user.email,id:user._id},process.env.JWT_SECRET);
                delete user.password; //removing password property
                res.status(201).json({token, user})
            } else {
                res.status(401).json({message:"Password does not match!"});
            }
        } else {
            res.status(404).json({message:"user not found with given email ID!"});
        }

    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
exports.signUp = async (req, res, next) => {
    try {
        const email = req.body.email.toLowerCase()
        let userfound = await User.findOne({ email: email})
        if(userfound) 
            res.status(400).json({message:'user with email already exist!'})
        else{
            bcrypt.hash(req.body.password,10,(err,result)=>{
                if(!err){
                    let user = new User({
                        name:req.body.name,
                        email:req.body.email,
                        password:result
                    })
                    user.save().then(
                        (response)=>res.status(201).json(response)
                    ).catch(
                        err=>res.status(400).json({message:'Bad request!',err})
                    );
                } else {
                    res.status(400).json({message:'Bad request!'});
                }
            })
        }
    } catch (error) {
        res.status(500).json({message:"Server down!",error})
    }
}
exports.verifyToken = (req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token =  req.headers.authorization.split(' ')[1] 
        jwt.verify(token,process.env.JWT_SECRET,(err,result)=>{
            if(!err) {
                req.user = result;
                next();
            } else {
                res.status(401).json({message:"Unauthorised user"}); 
            }
        }) 
    } else {
        res.status(403).json({message:"Authorization Token Not Found"}); 
    }
}

exports.verifyUser = async (req,res) => {
    const user = await User.findOne({email:req.user.email},{email:1,name:1,role:1,_id:1}).lean();
    res.status(200).json(user);
}

exports.resetToken = async (req,res,next) => {
    const user = await User.findOne({email:req.body.email});
    if(user) {
        const token = getRandomString(8);
        user.resettoken = token;
        user.save();
        req.body = {
            from: req.body.from,
            html: `<div>Hi ${user.name},<br/>Your password reset token is <strong>${token}</strong><br/>Regards,<br/>Avinash Aggarwal<br/>Developer@fortyapp</div>`,
            subject: req.body.subject,
            to: `${user.email}`,
        };
        next()
    } else {
        res.status(400).json({message:'User not found with given email!'})
    }
}

exports.resetPassword = async (req,res,next) => {
    try {
        const {email, token, password} = req.body;  

        if (!email) {
            res.status(400).json({message:'Email required!'})
        };
        if (!token) {
            res.status(400).json({message:'Token required!'})
        };
        if (!password) {
            res.status(400).json({message:'Password required!'})
        };
        
        const user = await User.findOne({ email: email.toLowerCase()})

        if(!user) 
            res.status(400).json({message:'User not found with given email!'})
        else if(user.resettoken && user.resettoken === token){
            bcrypt.hash(password, 10, (err,result)=>{
                if(!err){
                    user.password = result;
                    user.resettoken = null
                    user.save().then(
                        data => res.status(201).json({message:'Password Reset Successful!'})
                    ).catch(
                        err=>res.status(400).json({message:'Bad request!',err})
                    );
                } else {
                    res.status(400).json({message:'Bad request!'});
                }
            })
        } else {
            res.status(400).json({message:'Token is either invalid or expired!'})
        }
    } catch (error) {
        console.log(err) 
    }
}

function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}