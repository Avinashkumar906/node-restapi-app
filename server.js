const log = require('log-to-file')
log(`Server is starting`);

// setting enviroment variables
if(!process.env.PORT){
    require('dotenv').config();
}

const mongoose = require('mongoose');
const app = require('./app')

//mongo setup
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
    err ? log(`Mongodb error ${err}<br/>`) : log(`Mongodb Up! <br/>`);
});


//Starting server on specified port
app.listen(process.env.PORT || 8080,()=>console.log(`Server running at port ${process.env.PORT}<br/>`));