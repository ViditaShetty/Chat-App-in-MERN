const mongoose=require("mongoose");
const schema=mongoose.Schema({
    name:{
       type:String,
       required:true,
       minlength:3
    },
    username:{
      type:String,
      required:true,
      minlength:3
    },
    address:{
      type:String,
      required:true,
      minlength:3
    },
    email:{
        type:String,
        required:true,
        minlength:3
     },
     password:{
      type:String,
      required:true,
   },
   image:{
      type:String,
      
   },

})

const model2=mongoose.model('SignUpCollection',schema)
module.exports=model2