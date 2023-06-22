import React from 'react';
import Navbar from './Navbar';
import {Typography ,makeStyles,Button,TextField, Container} from '@material-ui/core'
import axios from 'axios';
import { useState } from 'react';



const setHeader=()=>{
  const header={
      headers:{
       "x-auth-token":localStorage.getItem("token")
      }
   }
   return header
}//***** */SETTING HADERS FOR AXIOS IS IMPORTANT FOR AUTHORIZATION WHILE SENDING RESPONSE


const useStyles=makeStyles({
  form:{
    margin:"20px ",
    padding:"20px ",
    justifyContent:'space-between',
    boxShadow:"0px 0px 12px -3px #000000",
  },
  marginn:{
    marginTop:"10px"
  }
})
const SignUp = () => {    
   const classes=useStyles();
   const handleSubmit=async(e)=>{
    e.preventDefault();
    var newUser={ name:name,
      username:username,
      address:address,
      email:email,
      password:pswd,
      image:img
    }
    await axios.post("http://localhost:5000/signup",newUser)
               .then((res)=>{
                  localStorage.setItem("token",res);  
                  console.log("saved user into db",newUser)
               })
               .catch((e)=>{console.log(e)})

}

const [name,setName]=useState("");
const [username,setUserName]=useState("");
const [address,setAddress]=useState("");
const [email,setEmail]=useState("");
const [pswd,setPswd]=useState("");
const [img,setImg]=useState("");
  return (
    <Container maxWidth="lg">
    <Navbar/>
    <Container maxWidth="sm">
    <form className={classes.form} noValidate autoComplete='off' onSubmit={handleSubmit}>
      <Typography variant="h4">Sign Up</Typography>
      <TextField id="name"  label="Enter name" variant='outlined' fullWidth className={classes.marginn} onChange={(e)=>{setName(e.target.value)}}></TextField>
      <TextField id="username"  label="Enter username" variant='outlined' fullWidth className={classes.marginn} onChange={(e)=>{setUserName(e.target.value)}}></TextField>
      <TextField id="address"  label="Enter address" variant='outlined' fullWidth className={classes.marginn} onChange={(e)=>{setAddress(e.target.value)}}></TextField>
      <TextField id="email"  label="Enter email" variant='outlined' fullWidth className={classes.marginn} onChange={(e)=>{setEmail(e.target.value)}}></TextField>
      <TextField id="pswd"  label="Enter password" variant='outlined' fullWidth className={classes.marginn} onChange={(e)=>{setPswd(e.target.value)}}></TextField>
      <TextField id="img"  label="Selected image path" variant='outlined'  className={classes.marginn} style={{display:"flex"}} onChange={(e)=>{setImg(e.target.value)}}></TextField>
        <Button>upload image</Button><br/>
      <Button variant='contained' color="primary" type="submit" className={classes.marginn}>SIGNUP</Button>
    </form></Container>
  </Container>
  )
}

export default SignUp