const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet')
const compression = require('compression');
const userRouter = require('./routes/user')
const mailRouter = require('./routes/mail')
const albumRouter = require('./routes/album')
const bodyParser = require('body-parser')
const path = require('path')
const fileController = require('./controller/fileUploadController')

// setting enviroment variables
if(!process.env.PORT){
    require('dotenv').config();
}

var multer  = require('multer')

var upload = multer({ dest: 'uploads/' })
const app = express();

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

app.use('/uploadimage', upload.single('file'), fileController.fileUploader)

app.use('',(req,res,next)=>{
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(path.join(__dirname,'index.html'))
})

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},(err)=>{
    if(!err){
        app.listen(process.env.PORT || 8080,()=>console.log(`server running at port ${process.env.PORT}`))
    } else {
        console.log(err)
    }
});

