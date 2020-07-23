const mongoose = require('mongoose');
const config = require('./../mongoose');


const dataSchema=mongoose.Schema({
    city:{
        type:String
    },
    category:{
        type:String
    },
    name:{
        type:String
    },
    address:{
        type:String
    }
})
const data=module.exports=mongoose.model('data',dataSchema);

module.exports.addData=function(data,callback)
{
    data.save(callback);
}
// module.export.city=function(city,callback)
// {
//     data.find({}, {city:city});
// }