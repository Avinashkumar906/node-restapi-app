const Image = require('../model/image')
const Profile = require('../model/profile')
const log = require('log-to-file');
const _ = require('lodash')

exports.getImage = async (req, res) => {
    try {
        let images = await Image.find()
        images = _.reverse(images)
        res.status(201).json(images);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getAlbum = async (req, res) => {
    try {
        let filter = req.query.filter
        let group = await Image.distinct(filter)
        let album = await group.map(async (item) => {
            let temp = await Image.find().where(filter).equals(item)
            return temp;
        })
        const result = await Promise.all(album)
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.postImage = async (req, res) => {
    try {
        let image = JSON.parse(req.body.body);
        let profile = await Profile.findById(req.user.id)
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

exports.deleteAlbum = async (req, res, next) => {
    try {
        log("Album to delete Id:" + req.params.id + '<br/>')
        let image = await Image.findByIdAndDelete(req.params.id)
        req.album = image
        next()
    } catch (error) {
        res.status(500).json(error);
    }
}