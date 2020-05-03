const User = require('../model/user')
const bcrypt = require('bcryptjs')

exports.getUserData = async (req, res, next) => {
    try {
        var mail = req.user ? req.user.email : process.env.DEFAULT_EMAIL
        var user = await User.findOne({ email: mail})
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.postNameAndBio = async (req,res)=>{
    try {
        // req.user = {email:'avinashkumar906@gmail.com'}
        if(req.user){
            let mail = req.user.email 
            let user = await User.findOne({email:mail})
                user.name = req.body.name;
                user.bio = req.body.bio;
            user.save(()=>{
                res.status(201).json({message:"updated successfull!"})
            })
        } else {
            res.status(401).json( { message:"Unauthorised User!" } )
        }
    } catch (error) {
        res.status(400).json({message:"some error occured!"})
    }
}

exports.postUserData = async (req,res,next)=>{
    try {
        let mail = req.user ? req.user.email : res.status(401).json({message:"Unauthorised User!"});
        let user = await User.findOne({email:mail})
            user.contact = req.body;
            user.save(()=>{
                res.status(201).json({message:"updated successfull!"})
            })

    } catch (error) {
        res.status(400).json({message:"some error occured!"})
    }
}

exports.postAboutSection = async (req,res,next)=>{
    try {
        let mail = req.user ? req.user.email : res.status(401).json({message:"Unauthorised User!"});
        let user = await User.findOne({email:mail})
            user.about = req.body;
            user.save(()=>{
                res.status(201).json({message:"updated successfull!"})
            })
    } catch (error) {
        res.status(400).json({message:"some error occured!"})
    }
}
exports.postPortfolioSection = async (req,res,next)=>{
    try {
        let mail = req.user ? req.user.email : res.status(401).json({message:"Unauthorised User!"});
        let user = await User.findOne({email:mail})
            user.portfolio = req.body;
            user.save(()=>{
                res.status(201).json({message:"updated successfull!"})
            })
    } catch (error) {
        res.status(400).json({message:"some error occured!"})
    }
}
exports.postResumeSection = async (req,res,next)=>{
    try {
        let mail = req.user ? req.user.email : res.status(401).json({message:"Unauthorised User!"});
        let user = await User.findOne({email:mail})
            user.resume = req.body;
            user.save(()=>{
                res.status(201).json({message:"updated successfull!"})
            })
    } catch (error) {
        res.status(400).json({message:"some error occured!"})
    }
}