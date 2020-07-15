const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet')
const fileUploader = require('express-fileupload');
const compression = require('compression');
const userRouter = require('./routes/user')
const mailRouter = require('./routes/mail')
const albumRouter = require('./routes/album')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const fileController = require('./controller/fileUploadController')
const log = require('log-to-file')
//init application
const app = express();

// setting enviroment variables
if(!process.env.PORT){
    log('This is Development enviroment!<br/>')
    require('dotenv').config();
}

//setting Cors
app.use(cors())


//file handler using multer
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


//file handler using express
app.use(fileUploader({
    useTempFiles : true,
}));

// middlewares for internal usage.
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

//routes
app.use(mailRouter);
app.use(userRouter);
app.use(albumRouter);
app.use('/uploadimagev2', fileController.fileUploaderv2)
app.use('/uploadimage', upload.single('file'), fileController.fileUploader)

//default route
app.use('',(req,res,next)=>{
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(path.join(__dirname,'default.log'))
})

//mongo setup
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},(err)=>{
    if(!err){
        app.listen(process.env.PORT || 8080,()=>console.log(`Server running at port ${process.env.PORT}<br/>`))
    } else {
        log(err +'<br/>')
    }
});

