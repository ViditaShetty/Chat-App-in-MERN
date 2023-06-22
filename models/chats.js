const mongoose=require("mongoose");
const schema=mongoose.Schema({
    nameGroup:{
       type:String,
       required:true,
       minlength:3
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    admin:{
        type:String,
        required:true,
        minlength:3
     },
     createdAt:{
        type:String,
        required:true,
     },
     users:[{
      type:String,
      required:true,
     }]

},
{timestamps:true}

)

const model1=mongoose.model('ChatsCollection',schema)
module.exports=model1