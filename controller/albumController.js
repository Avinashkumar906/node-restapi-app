const Image = require('../model/image')
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

exports.postImage = (req, res) => {
    const image = JSON.parse(req.body.body);
    log(`albumController.postImage:`)
    if (req.user.id == image.authorId && req.user.email == image.authorMail) {
        image.url = req.url;
        image.alt = req.alt;
        log(`albumController.postImage: ${image}`)
        let obj = new Image(image)
        obj.save().then(
            result => res.status(201).json(result)
        ).catch(
            err => res.status(400).json(err)
        )
    } else {
        res.json({ mesage: 'User not authorised' })
    }
}

exports.deleteImage = async (req, res, next) => {
    const { id, authorId, authorMail } = req.query;
    try {
        if (req.user.id ==  authorId && req.user.email == authorMail) {
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