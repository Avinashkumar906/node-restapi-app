const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

exports.fileUploader=(req,res,next)=>{
    let tempfile = req.file.destination + req.file.filename;
    cloudinary.uploader.upload(tempfile, (error, result)=>{
            error ? res.send(error) : res.status(201).send(result)
        }
    );
}
exports.fileDestroy = (req,res,next)=>{
    var filename = req.filename;
    console.log("FileController delete function call with file:" + filename)
    cloudinary.uploader.destroy(filename,(error,result)=>{
            error ? res.send(error) : res.status(201).send({'message':'image deleted!'})
        }
    );
}