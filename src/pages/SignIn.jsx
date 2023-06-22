import React from 'react';
import Navbar from './Navbar';
import {Typography ,makeStyles,Button,TextField, Container} from '@material-ui/core'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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
const SignIn = () => {    
   const classes=useStyles();
   const navigate=useNavigate();

   const handleSubmit=async(e)=>{
    e.preventDefault();
    var newUser={ 
      email:email,
      password:pswd,
    }
    await axios.post("http://localhost:5000/signin",newUser)
               .then((res)=>{
                console.log("res from post signin=",res);
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("id",res.data.id)
                navigate('/')
                })
               .catch((e)=>{console.log(e)})

}

const [email,setEmail]=useState("");
const [pswd,setPswd]=useState("");
  return (
    <Container maxWidth="lg">
    <Navbar/>
    <Container maxWidth="sm">
    <form className={classes.form} noValidate autoComplete='off' onSubmit={handleSubmit}>
      <Typography variant="h4">Sign In</Typography>
       <TextField id="email"  label="Enter email" variant='outlined' fullWidth className={classes.marginn} onChange={(e)=>{setEmail(e.target.value)}}></TextField>
      <TextField id="pswd"  label="Enter password" variant='outlined' fullWidth className={classes.marginn} onChange={(e)=>{setPswd(e.target.value)}}></TextField>
      <Button variant='contained' color="primary" type="submit" className={classes.marginn}>SIGNIN</Button>
    </form></Container>
  </Container>
  )
}

export default SignIn