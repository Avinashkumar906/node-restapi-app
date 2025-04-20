const User = require('../model/user')
const Profile = require('../model/profile')
const About = require('../model/about')
const Resume = require('../model/resume')
const Project = require('../model/project')
const Contact = require('../model/contact')
const log = require('log-to-file')

module.exports = {
    // Depricated function
    getUserData:async (req, res, next) => {
        try {
            const email = req.query.email || process.env.DEFAULT_EMAIL;
            const result = await User.findOne({ email: email},{password:0,images:0, taskBoards:0, tasks:0, resettoken:0 });
            res.status(201).json(result)
        } catch (error) {
            res.status(400).json(error)
        }
    },
    
    postNameAndBio : async (req,res)=>{
        try {
            log(`userController.postNameAndBio() user logged: ${JSON.stringify(req.user)}<br/>`);
            if(req.user && req.user.email){
                let mail = req.user.email;
                let user = await Profile.findOne({email:mail}, {password:0, images:0, taskBoards:0, tasks:0, resettoken:0 });
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
    postAboutSection : async (req,res,next)=>{
        try {
            log(`userController.postAboutSection() user logged: ${JSON.stringify(req.user)}<br/>`);
        
            if (req.user && req.user.email) {
                const mail = req.user.email;
        
                const user = await Profile.findOne(
                    { email: mail },
                    { password: 0, images: 0, taskBoards: 0, tasks: 0, resettoken: 0 }
                );
        
                if (!user) {
                    return res.status(404).json({ message: "User not found!" });
                }
        
                let about;
        
                if (user.about) {
                    // Fetch existing about
                    about = await About.findById(user.about);
                    if (!about) {
                        return res.status(404).json({ message: "About document not found!" });
                    }
        
                    // Replace existing about
                    about.replaceOne(req.body, (err, result) => {
                        !err
                            ? res.status(201).json(result)
                            : res.status(401).json({ message: "User data not found!", err });
                    });
                } else {
                    // Create new About
                    const newAbout = new About(req.body);
                    about = await newAbout.save();
        
                    // Link About to user and save
                    user.about = about._id;
                    await user.save();
        
                    res.status(201).json({ message: "About section created and linked to user", about });
                }
            } else {
                res.status(401).json({ message: "Unauthorised User!" });
            }
        } catch (error) {
            console.error("Caught error:", error);
            res.status(400).json({ message: "Some error occurred!", error });
        }
    },
    postUserData: async (req, res, next) => {
        try {
            log(`userController.postUserData() user logged: ${JSON.stringify(req.user)}<br/>`);
            
            if (!req.user?.email) {
                return res.status(401).json({ message: "Unauthorised User!" });
            }
    
            const user = await Profile.findOne(
                { email: req.user.email },
                { password: 0, images: 0, taskBoards: 0, tasks: 0, resettoken: 0 }
            );
    
            if (user.contact) {
                const contact = await Contact.findById(user.contact);
                if (contact) {
                    return contact.replaceOne(req.body, (err, result) => {
                        return !err
                            ? res.status(201).json(result)
                            : res.status(401).json({ message: "Contact update failed!", err });
                    });
                }
            } else {
                const newContact = new Contact(req.body);
                const savedContact = await newContact.save();
                user.contact = savedContact._id;
                await user.save();
    
                return res.status(201).json({ message: "Contact created and linked!", contact: savedContact });
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Some error occurred!" });
        }
    },
    
    postPortfolioSection: async (req, res, next) => {
        try {
            log(`userController.postPortfolioSection() user logged: ${JSON.stringify(req.user)}<br/>`);
            
            if (!req.user?.email) {
                return res.status(401).json({ message: "User email not available!" });
            }
    
            const user = await Profile.findOne(
                { email: req.user.email },
                { password: 0, images: 0, taskBoards: 0, tasks: 0, resettoken: 0 }
            );
    
            if (user.project) {
                const project = await Project.findById(user.project);
                if (project) {
                    return project.replaceOne(req.body, (err, result) => {
                        return !err
                            ? res.status(201).json(result)
                            : res.status(401).json({ message: "Project update failed!", err });
                    });
                }
            } else {
                const newProject = new Project(req.body);
                const savedProject = await newProject.save();
                user.project = savedProject._id;
                await user.save();
    
                return res.status(201).json({ message: "Project created and linked!", project: savedProject });
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Some error occurred!" });
        }
    },
    
    postResumeSection: async (req, res, next) => {
        try {
            log(`userController.postResumeSection() user logged: ${JSON.stringify(req.user)}<br/>`);
            
            if (!req.user?.email) {
                return res.status(401).json({ message: "Unauthorised User!" });
            }
    
            const user = await Profile.findOne(
                { email: req.user.email },
                { password: 0, images: 0, taskBoards: 0, tasks: 0, resettoken: 0 }
            );
    
            if (user.resume) {
                const resume = await Resume.findById(user.resume);
                if (resume) {
                    return resume.replaceOne(req.body, (err, result) => {
                        return !err
                            ? res.status(201).json(result)
                            : res.status(401).json({ message: "Resume update failed!", err });
                    });
                }
            } else {
                const newResume = new Resume(req.body);
                const savedResume = await newResume.save();
                user.resume = savedResume._id;
                await user.save();
    
                return res.status(201).json({ message: "Resume created and linked!", resume: savedResume });
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Some error occurred!" });
        }
    },    
    // Api for v2 
    getPortfolioUser: async (req, res, next) => {
        try {
            const email = req.query.email || process.env.DEFAULT_EMAIL;
    
            const profile = await Profile.findOne(
                { email },
                { password: 0, images: 0, taskBoards: 0, tasks: 0, resettoken: 0 }
            )
            .populate(['about', 'resume', 'project', 'contact'])
            .exec();
    
            return res.status(200).json(profile);
        } catch (error) {
            console.error("Error fetching portfolio user:", error);
            return res.status(400).json({ message: "Failed to fetch portfolio data", error });
        }
    }
}