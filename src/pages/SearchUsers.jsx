import React, { useEffect,useState } from 'react'

import {Button, TextField} from "@material-ui/core";
import Drawer from '@mui/material/Drawer';
import { Search } from '@material-ui/icons';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';
import axios from 'axios';


const SearchUsers = () => {
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
        onKeyDown={toggleDrawer(anchor, false)}
      >
      <List style={{display:"flex",margin:"10px"}}>
      <TextField label="Enter username" variant='outlined' fullWidth  ></TextField>
      <Button><Search/></Button>
       </List>  
       <div style={{marginLeft:"5%"}}> Select user to begin chatting...</div>    
      
       <List>
          {        
          /*tO LOAD USERS IN SEARCH USERS*/}
        {
          Users.map((user, index) => (
            <ListItem key={user.name} disablePadding >
              <ListItemButton onClick={async(e) => {
                const newItem={nameGroup:user.username,admin:localStorage.getItem("id"),createdAt:Date(),isGroupChat:false,users:[localStorage.getItem("id"),user._id]  }
                console.log(newItem)
                await axios.post("http://localhost:5000/chats",newItem)
              }} >
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
           <Button onClick={toggleDrawer("left", true)}><Search/>search user</Button>
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
  
  export default SearchUsers


