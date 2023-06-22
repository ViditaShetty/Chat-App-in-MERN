const express=require('express');
//interface to db=model
const m=require("mongoose");
const model2=require("../models/signupmodel");
const bcrypt=require("bcrypt");
const joi=require("joi");
const jwt=require("jsonwebtoken")
const schema=joi.object({
    name:joi.string().min(3).required(),
    username:joi.string().min(3).required(),
    address:joi.string().min(3).required(),
    email:joi.string().email().min(3).required(),
    password:joi.string().min(2).required(),
    image:joi.string().min(3),
})

//const cors=require("cors");
//const bodyParser=require("body-parser")
//should be in app.js

const router2=express.Router();

router2.get("/",async(req,res)=>{
    let pp=await model2.find({})
    res.status(200).send(pp)
})


router2.post("/getNames",async(req,res)=>{
    let commonclickfive=req.body
    console.log(req.body)
    let UserNames=[]
    if(commonclickfive!==[] && commonclickfive!==undefined){

    for(i=0;i<commonclickfive.length;i+=1){
        let userId=commonclickfive[i]
        console.log("request to view grp memeberss=",userId)
        let pp=await model2.find({_id:userId})
        pp=pp[0].username;
        console.log(pp)
        UserNames.push(pp)
      }
    res.send(UserNames)
}
})


router2.post("/",async(req,res)=>{
    //console.log("hi")//check this in backend concole

    let p=schema.validate(req.body);
    if(!p) return res.send("req body is incorrect")

    console.log("inside router",req.body)
    const {name,username,address,email,password,image}=req.body;
    //console.log(name,email)
    
    //we check if email is aldready present then send error
    let pp=await model2.find({email:email})
    console.log("PP===",pp)
    if(pp!==[]) res.status(400)        
    
    //post the data to db by converting to model format and saving it after validating all reuired foelds are present in req body using joi
    let doc1=new model2({
        name:name,
        username:username,
        address:address,
        email:email,
        password:password,
        image:image
    })
    console.log("hi")
    const salt=await bcrypt.genSalt(10)//****await */
    const newP=await bcrypt.hash(password,salt)
    doc1.password=newP
    console.log("hi t")

   
    await doc1.save() //await***********
    console.log("doc1", doc1)        
     const token=jwt.sign({_id:doc1._id,name:name,email:email},"123")       
    // localStorage.setItem("token")=token    
    //localStorage doesnt excist in backend so pass to frontend
        console.log(token)
        res.send(token)   
        
})

module.exports=router2;