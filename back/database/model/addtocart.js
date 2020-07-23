const mongoose=require('mongoose');
const config=require('../../database/mongoose');

const cartSchema=mongoose.Schema({
    userId:{
        type:String
    },
    cardId:{
        type:String
    },
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
const cart=module.exports=mongoose.model('cart',cartSchema);

module.exports.addCart=function(data,callback)
{
    data.save(callback);
}