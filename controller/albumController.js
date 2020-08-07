const Image = require('../model/image')
const Profile = require('../model/profile')
const log = require('log-to-file');
const _ = require('lodash')

exports.getImages = async (req, res) => {
    try {
        let images = await Image.find({private: null|false})
        images = _.reverse(images)
        res.status(201).json(images);
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.getImage = async (req, res) => {
    try {
        const { id } = req.query;
        let image = await Image.findById(id)
        res.status(201).json(image);
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.getMyUploads = async (req, res) => {
    try {
        const { id } = req.user
        let images = await Image.find({profile: id})
        images = _.reverse(images)
        res.status(201).json(images);
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.patchImage = async (req, res) => {
    const { id } = req.query;
    let update = req.body;
    update.tags = update.tags.split(',')
    if (req.user.role == 'admin' || (image.profile == req.user.id)) {
        let result = await Image.findByIdAndUpdate(id, update, {useFindAndModify:false})
        result = await Image.findById(id)
        res.status(201).json(result);
    } else{
        res.status(400).json({message:"Not authorised !"}); 
    }
}
exports.getTagged = async (req, res) => {
    try {
        const { email }= req.user
        let images = await Image.find({tags: email})
        images = _.reverse(images)
        res.status(201).json(images);
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.getLiked = async (req, res) => {
    try {
        const { id }= req.user
        let images = await Image.find({likes: id})
        images = _.reverse(images)
        res.status(201).json(images);
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.getPrivate = async (req, res) => {
    try {
        const { id }= req.user
        let images = await Image.find({profile: id,private:true})
        images = _.reverse(images)
        res.status(201).json(images);
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.getFavorite = async (req, res) => {
    try {
        const { id }= req.user
        let images = await Image.find({heart: id})
        images = _.reverse(images)
        res.status(201).json(images);
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.untagMe = async (req, res) => {
    try {
        const { id }= req.user
        let images = await Image.find({heart: id})
        images = _.reverse(images)
        res.status(201).json(images);
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.postImage = async (req, res) => {
    try {
        let image = JSON.parse(req.body.body);
        let profile = await Profile.findById(req.user.id)
        image.tags = image.tags.split(',')
        image.url = req.url;
        image.alt = req.alt;
            log(`albumController.postImage: ${image}`)
        image = new Image(image)
            // assigning image to user
        image.profile = profile;
        image = await image.save()
            // updating user
        profile.images.push(image)
        profile.save()
        res.status(201).json(image)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message,error});
    }
    
}

exports.deleteImage = async (req, res, next) => {
    const { id } = req.query;
    try {
        let image = await Image.findById(id)
        let profile = await Profile.findById(req.user.id)
        if ( req.user.role == 'admin' || (image.profile == req.user.id)) {
            //removing from profile       
            profile.images.splice(profile.images.indexOf(id),1)
            req.filename = image.alt
            image.deleteOne()
            profile.save()
            next();
        }else{
            res.status(400).json({message:"Not authorised !"});    
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message,error});
    }
}

exports.likeImage = async (req, res, next) => {
    const { userid,imageid } = req.query;
    try {
        let image = await Image.findById(imageid)
        if ( req.user.role == 'admin' || (userid == req.user.id)) {
            let result = _.findIndex(image.likes,(id)=>id === userid)
            // logic to like and dislike
            result < 0 ? image.likes.push(userid) : image.likes.splice(result,1)
            image.save();
            res.status(200).json(image);
        }else{
            res.status(400).json({message:"Not authorised !"});    
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message,error});
    }
}

exports.heartImage = async (req, res, next) => {
    const { userid,imageid } = req.query;
    try {
        let image = await Image.findById(imageid)
        if ( req.user.role == 'admin' || (userid == req.user.id)) {
            let result = _.findIndex(image.heart,(id)=>id === userid)
            // logic to heart and disheart
            result < 0 ? image.heart.push(userid) : image.heart.splice(result,1)
            image.save();
            res.status(200).json(image);
        }else{
            res.status(400).json({message:"Not authorised !"});    
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message,error});
    }
}

exports.tagImage = async (req, res, next) => {
    const { email,imageid } = req.query;
    try {
        let image = await Image.findById(imageid)
        if ( req.user.role == 'admin' || (email == req.user.email)) {
            let result = _.findIndex(image.tags,(email)=>email === email)
            // logic to heart and disheart
            result < 0 ? image.tags.push(email) : image.tags.splice(result,1)
            image.save();
            res.status(200).json(image);
        }else{
            res.status(400).json({message:"Not authorised !"});    
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message,error});
    }
}
