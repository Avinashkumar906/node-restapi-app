const Image = require('../model/image')
const log = require('log-to-file')

exports.getImage = async (req,res)=>{
    try {
        
        let images = await Image.find({image:true})
        res.status(201).json(images);
    } catch (error) {
        res.status(500).json(error);
    } 
}

exports.getAlbum = async (req,res)=>{
    try {
        let images = await Image.find({album:true})
        res.status(201).json(images);
    } catch (error) {
        res.status(500).json(error);
    } 
}

exports.postImage = (req,res)=>{
    let image = new Image(req.body)
    image.save(()=>res.status(201).json({message:'uploaded.!'}));
}

exports.deleteImage = async (req,res,next)=>{
    try {
        log("Image to delete Id:" + req.params.id +'<br/>')
        let image = await Image.findByIdAndDelete(req.params.id)
        req.filename = image.alt
        next();
    } catch (error) {
        res.status(500).json(error);
    } 
}

exports.deleteAlbum = async (req,res,next)=>{
    try {
        log("Album to delete Id:" + req.params.id+'<br/>')
        let image = await Image.findByIdAndDelete(req.params.id)
        req.album = image
        next() 
    } catch (error) {
        res.status(500).json(error);
    } 
}