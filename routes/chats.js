const e=require('express');
//interface to db=model
const m=require("mongoose");
const model1=require("../models/chats");
const model2=require("../models/signupmodel");//for mapping user id to names from chats got from db

//const cors=require("cors");
//const bodyParser=require("body-parser")
//should be in app.js

const router1=e.Router();

router1.get("/:id",async(req,res)=>{
    //get records from db
    let idToNameDoc;
    console.log("got chtahistory=",req.params.id)
    var doc1=await model1.find({
    ///return id of all convos which user is part of
     users: { $all:[req.params.id] }
  })
  res.send(doc1);

})

router1.post("/",async(req,res)=>{
   // let p=schema.validate(req.body);
  //  if(!p) return res.status(404).send("req body is incorrect")
  
  //const token=req.header("x-auth-token"); //localStorage isnt defined at backend thus we have to pass from frontend
  //console.log("authBeforCRUD",token)
  //if(!token)return res.status(401).send("not available>>>")
    
    console.log("inside router",req.body)
    const {nameGroup,admin,createdAt,isGroupChat,users}=req.body;
   
   
    //convert usernames' email to userIds
    await users.map(async(userName)=>{
         await model2.find({})
    })


    //post the data to db by converting to model format and saving it after validating all reuired foelds are present in req body using joi
    let doc1=new model1({
        nameGroup:nameGroup,
        admin:admin,
        createdAt:createdAt,
        isGroupChat:isGroupChat,
        users:users  //[]
    })
    doc1.save()
        .then((doc1)=>{
            console.log("the request is saved into db",doc1)
        })
        .catch((err)=>{
            res.status(404).send("post failed",err)
        })
})

router1.delete("/:id",async(res,req)=>{
   // let p1=schema.validate(req.body);
  //  if(!p1) return res.status(404).send("req body is incorrect")
    const p=await model1.findByIdAndDelete(req.params.id);
    res.send(p);
})


router1.put("/:id",async(res,req)=>{
   // let p1=schema.validate(req.body);
   // if(!p1) return res.status(404).send("req body is incorrect")
   
    const p=await model1.findByIdAndUpdate(req.params.id,req.body.newItem,{new:true});
    if(!p) res.status(404).send("Not found")
    res.send(p);
})
module.exports=router1;