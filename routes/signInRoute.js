const e=require('express');
jwtDecode=require('jwt-decode');

//interface to db=model
const m=require("mongoose");
const joi=require("joi");
const jwt=require("jsonwebtoken");
const model2=require('../models/signupmodel')
const bcrypt=require("bcrypt")
const schema=joi.object({
    email:joi.string().min(3).required(),
    password:joi.string().min(3).required(),
})

//const cors=require("cors");
//const bodyParser=require("body-parser")
//should be in app.js

const router3=e.Router();


router3.post("/",async(req,res)=>{
    let p=schema.validate(req.body);
    if(!p) return res.status(404).send("req body is incorrect")
    console.log("inside router",req.body)
    const {email,password}=req.body;
    let Itemindb=await model2.find({email:email})
    console.log("ItemInDb=",Itemindb);
    let passindb=Itemindb[0].password
    //ITEMINDB IS A ARRAY SO ITEMINDB[0]
     console.log("password compare,",passindb," ",password)
    let correctP=await bcrypt.compare(password,passindb)
    if(!correctP) res.status(400).send("not correct password")
    const token=await jwt.sign({id:Itemindb._id,name:Itemindb.name,email:email},"123")
    let  id=Itemindb[0]._id;
    console.log("itemid in db=",id)
    id=id.toString();
    const resp={token:token,id:id}
    console.log(resp)
    res.send(resp)
})
module.exports=router3;