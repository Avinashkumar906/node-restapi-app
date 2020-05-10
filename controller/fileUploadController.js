const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

function deleteFile(filename){
    // cloudinary.uploader.destroy(filename,(error,result)=>{
    //         error ? console.log(error) : console.log('Deleted File: ' +filename)
    //     } 
    // );
}  
  

exports.fileUploader=(req,res,next)=>{
    let tempfile = req.file.destination + req.file.filename;
    cloudinary.uploader.upload(tempfile, (error, result)=>{
            error ? res.send(error) : res.status(201).send(result)
        }
    );
}
exports.fileDestroy = (req,res,next)=>{
    var filename = req.filename;
    deleteFile(filename);
    res.status(201).send({'message':'Image deleted!'})
}

exports.multiFiledestroy=(req,res)=>{
    var album = req.album
    if(album.alt){
        deleteFile(album.alt)
    }
    album.urls.forEach(element => {
        deleteFile(element.alt)
    });
    res.status(201).send({'message':'Album deleted!'})
}