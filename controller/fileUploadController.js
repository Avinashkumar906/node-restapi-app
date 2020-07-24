const cloudinary = require('cloudinary').v2;
const log = require('log-to-file')

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

function deleteFile(filename){
    cloudinary.uploader.destroy(filename,(error,result)=>{
            error ? log(error+ '<br>') : log('Deleted File: ' +filename +'<br>')
        } 
    );
}  
  
exports.fileUploader=(req,res,next)=>{
    let tempfile = req.file.destination + req.file.filename;
    cloudinary.uploader.upload(tempfile, (error, result)=>{
            error ? res.send(error) : res.status(201).send(result)
        }
    );
}

exports.fileUploaderAndNext=(req,res,next)=>{
    if(req.files.file){
        let tempfile = req.files.file;
        log(`fileuploaderv2: ${JSON.stringify(tempfile)} <br/>`)
        cloudinary.uploader.upload(tempfile.tempFilePath, (error, result)=>{
            if(result){
                req.url = result.secure_url;
                req.alt = result.public_id;
                log(`fileUploadController.fileUploaderAndNext(): ${result} <br/>`)
                next();
            }
            else{
                res.send(error)
                // req.url = 'result.secure_url';
                // req.alt = 'result.public_id';
                // next();
            }
        });  
    } else {
        res.send({'message':"please upload a file!"})
    }
}

exports.fileUploaderv2=(req,res,next)=>{
    let tempfile = req.files.file;
    log(`fileuploaderv2: ${JSON.stringify(tempfile)} <br/>`)
    cloudinary.uploader.upload(tempfile.tempFilePath, (error, result)=>{
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
    album.urls.forEach(element => {
        deleteFile(element.alt)
    });
    res.status(201).send({'message':'Album deleted!'})
}