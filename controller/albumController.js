const Image = require('../model/image')
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

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
    image.save(()=>res.status(201).json({message:'image uploaded.!'}));
}

exports.deleteImage = async (req,res,next)=>{
    try {
        let image = await Image.findByIdAndDelete(req.params.id)
        req.filename = image.alt
        next();
    } catch (error) {
        res.status(500).json(error);
    } 
}

exports.deleteAlbum = async (req,res)=>{
    try {
        let id = req.params.id;
        let image = await Image.findById(id)
        let filename = image.alt;
        cloudinary.uploader.destroy(filename,(error,result)=>{
                if(error){
                    res.send(error)
                } else {
                    image.remove(()=>res.status(201).json({message:'image deleted.!'}))
                }
            }
        );
    } catch (error) {
        res.status(500).json(error);
    } 
}