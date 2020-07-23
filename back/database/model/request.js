const mongoose = require('mongoose');
const config = require('./../mongoose');


const dataSchema=mongoose.Schema({
    foreign:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    number:{
        type:String
    }
})
const data=module.exports=mongoose.model('request',dataSchema);

module.exports.addData=function(data,callback)
{
    data.save(callback);
}
// module.export.city=function(city,callback)
// {
//     data.find({}, {city:city});
// }