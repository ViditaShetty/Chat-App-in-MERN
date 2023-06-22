import React, { useEffect,useState } from 'react'
import {AppBar,Toolbar,Typography,Button, TextField} from "@material-ui/core";
import {makeStyles} from '@material-ui/styles';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import { ControlCameraOutlined, Search } from '@material-ui/icons';


import axios from 'axios';

const useStyles=makeStyles({
    buttons:{
       color:"white",
       textDecoration:"none"
    },
    root:{
        flex:1,
        display:"flex",
        alignItems:"left"
    },
    root2:{
        flex:1,
        display:"flex",
        justifyContent:"flex-end" 
       }
})




const Navbar = () => {
 const classes=useStyles();
 
  const [Users,setUsers]=useState([])
   
  const LoadUsers=async()=>{
    await axios.get("http://localhost:5000/signup")
                .then((res)=>{
                console.log("users navbar=",res.data)
                setUsers(res.data)
                console.log(typeof Users,"=type of users")
                console.log(Users)
     })
  }////made this to load users on load
  useEffect(()=>{  
    LoadUsers();    
    console.log("reloaded",Users)

  },[])//re-load screen after users are got from axios.get

  return (
    <AppBar  position="static">    
        <Toolbar>
          <Typography className={classes.root}>
           <Link to="/" className={classes.buttons}>
             CHATAPP
            </Link>
          </Typography>
          <div className={classes.root2}>
          { 
          !(localStorage.getItem("token"))?
          <>
          <Button >
            <Link to="/signin" className={classes.buttons}>
            SignIn
            </Link>
          </Button>
          <Button >
            <Link to="/signup" className={classes.buttons}>
            SignUp
            </Link>
          </Button></>
          :
          <Button onClick={(e)=>{localStorage.clear()}}>
            <Link to="/signin" className={classes.buttons}>
            SignOut
            </Link>
          </Button>
                 }
          </div>
        </Toolbar>
     </AppBar>   

  )
}

export default Navbar