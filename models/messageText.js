const mongoose=require("mongoose");
const schema=mongoose.Schema({
    content:{
       type:String,
       required:true,
       minlength:3
    },
    sender:{
        type:String,
        required:true,
        minlength:3
     },
     cid:{
        type:String,
        required:true,
     },

},
{timestamps:true}

)

const model1=mongoose.model('MessageContentCollection',schema)
module.exports=model1