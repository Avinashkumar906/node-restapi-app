const Image = require('../model/image')
const Profile = require('../model/profile')
const log = require('log-to-file');

exports.getImage = async (req, res) => {
    try {
        let images = await Image.find()
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
        const image = JSON.parse(req.body.body);
        const profile = await Profile.findById(req.user.id)
        log(`albumController.postImage() profile posted: ${JSON.stringify(profile)}`)
        image.url = req.url;
        image.alt = req.alt;
        log(`albumController.postImage: ${image}`)
        let imageToInsert = new Image(image)
        // assigning image to user
        imageToInsert.profile = profile;
        let imageInserted = await imageToInsert.save()
        // updating user
        profile.images.push(imageInserted).profileToUpdate.save();
        res.status(201).json(imageInserted)
    } catch (error) {
        res.status(500).json({message:error.message,error});
    }
    
}

exports.deleteImage = async (req, res, next) => {
    const { id, authorId, authorMail } = req.query;
    try {
        if ((req.user.id ==  authorId && req.user.email == authorMail) || req.user.role == 'admin') {
            log(`Image to delete Id: ${id} <br/>`)
            let image = await Image.findByIdAndDelete(id)
            req.filename = image.alt
            next();
        }else{
            console.log("Not authorised !")
            res.status(400).json({message:"Not authorised !"});    
        }
    } catch (error) {
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