const User = require('../model/profile')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const log = require('log-to-file')

exports.signIn = async (req,res,next)=>{
    try {
        const email = req.body.email.toLowerCase()
        const user = await User.findOne({email:email},{email:1,name:1,password:1,role:1,_id:1});
        //checking existance of user
        if(user){
            let result = await  bcrypt.compare(req.body.password,user.password)
            //checking password
            if(result){
                log(`User Logged in : ${user.email}<br/>`)
                res.status(201).json({token:jwt.sign({role:user.role,email:user.email,id:user._id},process.env.JWT_SECRET),user:user})
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
                // res.status(200).json(result)
                next();
            } else {
                res.status(401).json({message:"Unauthorised user lll"}); 
            }
        }) 
    } else {
        res.status(401).json({message:"Authorization Token Not Found"}); 
    }
}
