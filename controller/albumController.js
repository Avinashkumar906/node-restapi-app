const Image = require('../model/image')

exports.getImage = async (req,res)=>{
    try {
        var images = await Image.find({image:true})
        res.status(201).json(images);
    } catch (error) {
        res.status(500).json(error);
    } 
}

exports.getAlbum = async (req,res)=>{
    try {
        var images = await Image.find({album:true})
        res.status(201).json(images);
    } catch (error) {
        res.status(500).json(error);
    } 
}

exports.postImage = (req,res)=>{
    var image = new Image(req.body)
    image.save(()=>res.status(201).json({message:'image uploaded.!'}));
}
