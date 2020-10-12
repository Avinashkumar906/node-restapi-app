const app = require('express')();
const fileUploader = require('express-fileupload');
const path = require('path')

// Static folder
app.use('/public',require('express').static(path.join(__dirname,'public')))

// middlewares for internal usage.
app.use(require('cors')())
app.use(require('body-parser').json());
app.use(require('helmet')());
app.use(require('compression')());
app.use(require('morgan')("combined"))

//file handler using express
app.use(fileUploader({
    useTempFiles : true,
}));

//routes
app.use(require('./routes/mail'));
app.use(require('./routes/user'));
app.use(require('./routes/image'));
app.use(require('./routes/portfolio'));
app.use(require('./routes/fortyapp'));
app.use('/uploadimagev2', require('./controller/fileUploadController').fileUploaderv2)

app.use('/logs',(req,res)=>{
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(require('path').join(__dirname,'default.log'))
})

app.use('',(req,res)=>{
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(require('path').join(__dirname,'public','index.html'))
})


module.exports = app;