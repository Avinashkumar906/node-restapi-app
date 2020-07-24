const log = require('log-to-file')
// setting enviroment variables
if(!process.env.PORT){
    log(`Server is starting`);
    require('dotenv').config();
}

const app = require('./app')
const mongoose = require('mongoose');


//Starting server on specified port
app.listen(process.env.PORT || 8080,()=>{
    //mongo setup
    mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
        err ? log(`Mongodb error ${err}<br/>`) : log(`Mongodb Up! <br/>`);
    });
    console.log(`Server running at port ${process.env.PORT}<br/>`)
});