const e=require('express');
//interface to db=model
const m=require("mongoose");
const model1=require("../models/messageText");

//const cors=require("cors");
//const bodyParser=require("body-parser")
//should be in app.js

const router4=e.Router();

router4.get("/:cid",async(req,res)=>{
    //get records from db
   const doc1=await model1.find({cid:req.params.cid});
   res.send(doc1)
})

router4.post("/",(req,res)=>{
   // if(!p) return res.status(404).send("req body is incorrect")
    console.log("inside router",req.body)
    const {cid,content,sender}=req.body;
    //post the data to db by converting to model format and saving it after validating all reuired foelds are present in req body using joi
    let doc1=new model1({
        content:content,
        sender:sender,
        cid:cid,
    })
    doc1.save()
        .then((doc1)=>{
            console.log("the request is saved into db",doc1)
        })
        .catch((err)=>{
            res.status(404).send("post failed",err)
        })
})

router4.delete("/:id",async(res,req)=>{
    if(!p1) return res.status(404).send("req body is incorrect")
    const p=await model1.findByIdAndDelete(req.params.id);
    res.send(p);
})

module.exports=router4;