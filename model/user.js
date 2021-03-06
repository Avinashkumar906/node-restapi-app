const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:String,
    password:String,
    name:String,
    bio:String,
    image:String,
    cover:String,
    about:{
        name:String,
        designation:String,
        position:String,
        age:Date,
        city:String,
        country:String,
        description:String,
        services:[{
            image:String,
            title:String,
            description:String,
        }],
        skills:[{
            title:String,
            progress:Number,
        }],
        pricing:[{
            title:String,
            price:Number,
            services:[String]
        }],
    },
    resume:{
        education:[{
            title:String,
            college:String,
            date:String,
            description:String,
        }],
        experience:[{
            title:String,
            college:String,
            date:String,
            description:String,
        }],
        testimonial:[{
            clientName:String,
            position:String,
            company:String,
            saying:String,
        }],
    },
    portfolio:{
        project:[{
            name:String,
            image:String,
            public_id:String,
            title:String,
            description:String,
            link:String,
            youtube:String,
            git:String,
            group:[String],
            technology:[String],
            liked:Number,
            day:{ type: Number , default: new Date().getDate()},
            month:{ type: String , default: new Date().toLocaleString('default', { month: 'long' })},
            year:{ type: Number , default: new Date().getFullYear()}
        }],
    },
    contact:{
        address:{
            line1:String,
            line2:String,
        },
        contact:{
            mob:Number,
            email:String,
        },
        web:{
            url:String,
            url2:String,
        },
        social:{
            facebook:String,
            insta:String,
            twitter:String,
            linkedink:String,
        }
    }
})

module.exports = mongoose.model('user', userSchema)