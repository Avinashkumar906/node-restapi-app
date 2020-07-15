const Image = require('../model/image')
const log = require('log-to-file')
const image = require('../model/image')

exports.getImage = async (req,res)=>{
    try {
        let images = await Image.find()
        let resultArray = images.filter(
            item=>item.urls.length == 0
        )
        res.status(201).json(resultArray);
    } catch (error) {
        res.status(500).json(error);
    } 
}

exports.getAlbum = async (req,res)=>{
    try {
        let images = await Image.find()
        let resultArray = images.filter(
            item=>item.urls.length != 0
        )
        res.status(201).json(resultArray);
    } catch (error) {
        res.status(500).json(error);
    } 
}

exports.postImage = (req,res)=>{
    if(req.url && req.alt){
        let image = JSON.parse(req.body.body);
        image.url = req.url; 
        image.alt = req.alt;
        console.log(image)
        let obj = new Image(image)
        obj.save().then(
            result=>res.status(201).json(result)
        ).catch(
            err=>res.status(400).json(err)
        )
    }else{
        res.json({'mesage':'please upload image!'})
    }  
}

exports.deleteImage = async (req,res,next)=>{
    try {
        log(`Image to delete Id: ${req.params.id} <br/>`)
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