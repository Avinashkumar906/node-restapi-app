const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet')
const fileUploader = require('express-fileupload');
const compression = require('compression');
const userRouter = require('./routes/user')
const mailRouter = require('./routes/mail')
const albumRouter = require('./routes/album')
const bodyParser = require('body-parser')
const path = require('path')
const fileController = require('./controller/fileUploadController')
const log = require('log-to-file')

// setting enviroment variables
if(!process.env.PORT){
    log('This is Development enviroment!<br/>')
    require('dotenv').config();
}

//file handler using multer
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

const app = express();
//file handler using express
app.use(fileUploader({
    useTempFiles : true,
}));

// middlewares for internal usage.
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Method','GET,POST,OPTION,PUT')
    res.setHeader('Access-Control-Allow-headers','Content-Type, Authorization')
    res.setHeader('Content-Type', 'application/json')
    next();
})

app.use(mailRouter);
app.use(userRouter);
app.use(albumRouter);

app.use('/uploadimagev2', fileController.fileUploaderv2)
app.use('/uploadimage', upload.single('file'), fileController.fileUploader)

app.use('',(req,res,next)=>{
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(path.join(__dirname,'default.log'))
})

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},(err)=>{
    if(!err){
        app.listen(process.env.PORT || 8080,()=>log(`Server running at port ${process.env.PORT}<br/>`))
    } else {
        log(err +'<br/>')
    }
});

