const User = require('../model/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const log = require('log-to-file')

exports.postUserLogin = async (req,res,next)=>{
    try {
        var user = await User.findOne({email:req.body.email});
    
        var result = user ? 
            await  bcrypt.compare(req.body.password,user.password) : 
            res.status(404).json({message:"user not found with given email ID!"});
        console.log(result)
        result ? 
            res.status(201).json(jwt.sign({name:user.name,email:user.email,id:user._id},process.env.JWT_SECRET)) : 
            res.status(404).json({message:"Password does not match!"});

    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
exports.signUp = async (req, res, next) => {
    try {
        var user = await User.findOne({ email: req.body.email})
        if(user) 
            res.status(400).json({message:'user with email already exist!'})
        else{
            bcrypt.hash(req.body.password,10,(err,result)=>{
                if(!err){
                    var user = new User({
                        email:req.body.email,
                        password:result
                    })
                    user.save(()=>res.status(201).json({message:'user registered!'}));
                } else {
                    res.status(400).json({message:'Bad request!'});
                }
            })
        }
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.verifyToken = (req,res,next)=>{
    console.log(req.headers.authorization)
    var token;
    if(req.headers.authorization){
        token =  req.headers.authorization.split(' ')[1] 
        //log(`This is token: ${token} <br/>`)
        jwt.verify(token,process.env.JWT_SECRET,(err,result)=>{
            if(!err) {
                req.user = result;
                next();
            } else {
                res.status(401).json({message:"Unauthorised user"}); 
            }
        }) 
    } else {
        res.status(401).json({message:"Unauthorised user"}); 
    }
    
}
