import React, { useEffect,useState } from 'react'

import {Button, TextField} from "@material-ui/core";
import Drawer from '@mui/material/Drawer';
import { CancelOutlined, Search } from '@material-ui/icons';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';
import axios from 'axios';


const Newchat = () => {
    const [Users,setUsers]=useState([])     
    const [grpName,setGrpName]=useState([])     
    const [UserIdArray,setUserIdArray]=useState([])     
    const [UserNameArray,setUserNameArray]=useState([])     
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
  
  
  const [state, setState] = React.useState({top: false,  });
  const toggleDrawer = (anchor, open) => async(event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;}
      setState({ ...state, [anchor]: open });
      await axios.get("http://localhost:5000/signup")
                  .then((res)=>{
                  console.log("users navbar=",res.data);
                  res=res.data
                  setUsers(res);
                  console.log(typeof Users,"=type of users")
                  console.log(Users)
       })};
  
  
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
        role="presentation"
      >
       
    <List style={{display:"flex",margin:"10px"}}>
      <TextField label="Enter groupname:" variant='outlined' fullWidth  onChange={(e)=>{setGrpName(e.target.value)}} id="value"></TextField>
      <Button>Done</Button>
    </List>  

       <List style={{display:"flex",margin:"10px"}}>
      <TextField label="Enter username" variant='outlined' fullWidth  ></TextField>
      <Button><Search/></Button>
       </List>
       <Button onClick={async(e) => {
                const newItem={nameGroup:grpName,admin:localStorage.getItem("id"),createdAt:Date(),isGroupChat:true,users:[localStorage.getItem("id"), ...UserIdArray]  }
                console.log(newItem)
                await axios.post("http://localhost:5000/chats",newItem)
              }}>Done Selecting users</Button>
       <div style={{marginLeft:"5%"}}> Select usersss to begin chatting...</div>   
       <div style={{marginLeft:"5%",display:"flex"}}>{
               UserNameArray.map((userSelected)=>{
                return(
                <div style={{backgroundColor:"blue",color:"white",margin:"3%",padding:"2%",width:"min-content",borderRadius:"17%",display:"flex"}}>
                    {userSelected}
                    <CancelOutlined/>
                </div>)
               })
           }
       </div> 

       <List>
          {        
          /*tO LOAD USERS IN SEARCH USERS*/}
        {
          Users.map((user, index) => (
            <ListItem key={user.name} disablePadding >
              <ListItemButton onClick={(e) => {
                     setUserIdArray([...UserIdArray,user._id]);
                     setUserNameArray([...UserNameArray,user.username])}} >
              <img src={user.image} alt="img"/>
              <ListItemText primary={user.username}  />
              <ListItemText primary={user.email}/>
             </ListItemButton>
            </ListItem>
          ))
          }
        </List>
      </Box>
    );
  
  
  return (
        <>
           <Button onClick={toggleDrawer("left", true)}>New Chat</Button>
              <Drawer
              anchor={"left"}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
              >
              {list("left")}
              </Drawer>
        </>
  
    )
  }
  
  export default Newchat


