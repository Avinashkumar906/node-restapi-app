const User = require('../model/user')
const Profile = require('../model/profile')
const About = require('../model/about')
const Resume = require('../model/resume')
const Project = require('../model/project')
const Contact = require('../model/contact')
const log = require('log-to-file')

module.exports = {
    getUserData:async (req, res, next) => {
        try {        
            const mail = process.env.DEFAULT_EMAIL;
            // fetching data from mongoDB
            const result = await User.findOne({ email: mail});
            res.status(201).json(result)
        } catch (error) {
            res.status(400).json(error)
        }
    },
    postAboutSection : async (req,res,next)=>{
        try {
            log(`userController.postAboutSection() user logged: ${JSON.stringify(req.user)}<br/>`)
            if(req.user && req.user.email == process.env.DEFAULT_EMAIL){
            let mail = process.env.DEFAULT_EMAIL;
            let user = await User.findOne({email:mail});
                user.about = req.body;
                user.save((err,result)=>{
                    !err ? res.status(201).json(result) : res.status(401).json({message:"User data not found!",err})
                })
            } else {
                res.status(401).json( { message:"Unauthorised User!" } )
            }
        } catch (error) {
            res.status(400).json({message:"some error occured!"})
        }
    },
    postNameAndBio : async (req,res)=>{
        try {
            log(`userController.postNameAndBio() user logged: ${JSON.stringify(req.user)}<br/>`);
            if(req.user && req.user.email == process.env.DEFAULT_EMAIL){
                let mail = process.env.DEFAULT_EMAIL;
                let user = await User.findOne({email:mail});
                    user.name = req.body.name;
                    user.bio = req.body.bio;
                    user.image = req.body.image;
                user.save((err,result)=>{
                    !err ? res.status(201).json(result) : res.status(401).json({message:"User data not found!",err})
                })
            } else {
                res.status(401).json( { message:"Unauthorised User!" } )
            }
        } catch (error) {
            res.status(400).json({message:"some error occured!"})
        }
    },
    postUserData : async (req,res,next)=>{
        try {
            log(`userController.postUserData() user logged: ${JSON.stringify(req.user)}<br/>`)
            if(req.user && req.user.email == process.env.DEFAULT_EMAIL){
                let mail = process.env.DEFAULT_EMAIL;
                let user = await User.findOne({email:mail});
                user.contact = req.body;
                user.save((err,result)=>{
                    !err ? res.status(201).json(result) : res.status(401).json({message:"User data not found!",err})
                })
            } else {
                res.status(401).json( { message:"Unauthorised User!" } )
            }
        } catch (error) {
            res.status(400).json({message:"some error occured!"})
        }
    },
    postPortfolioSection : async (req,res,next)=>{
        try {
            log(`userController.postPortfolioSection() user logged: ${JSON.stringify(req.user)}<br/>`)
            if(req.user && req.user.email == process.env.DEFAULT_EMAIL){
            let mail = process.env.DEFAULT_EMAIL;
            let user = await User.findOne({email:mail})
                user.portfolio = req.body;
                user.save((err,result)=>{
                    !err ? res.status(201).json(result) : res.status(401).json({message:"User data not found!",err})
                })
            } else {
                res.status(401).json( { message:"Unauthorised User!" } )
            }
        } catch (error) {
            res.status(400).json({message:"some error occured!"})
        }
    },
    postResumeSection : async (req,res,next)=>{
        try {
            log(`userController.postResumeSection() user logged: ${JSON.stringify(req.user)}<br/>`)
            if(req.user && req.user.email == process.env.DEFAULT_EMAIL){
                let mail = process.env.DEFAULT_EMAIL;
                let user = await User.findOne({email:mail})
                user.resume = req.body;
                user.save((err,result)=>{
                    !err ? res.status(201).json(result) : res.status(401).json({message:"User data not found!",err})
                })
            } else {
                res.status(401).json( { message:"Unauthorised User!" } )
            }
        } catch (error) {
            res.status(400).json({message:"some error occured!"})
        }
    },
    // Api for v2 
    getPortfolioUser: async (req, res, next) => {
        try {
            const email = process.env.DEFAULT_EMAIL;
            let profile = await Profile.findOne(
                { email: email},
                {password:0,images:0})
            .populate(['about','resume','project','contact']).exec();
            res.status(201).json(profile)
        } catch (error) {
            res.status(400).json(error)
        }
    }
}