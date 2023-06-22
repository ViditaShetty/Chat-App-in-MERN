import { Button, Container } from '@material-ui/core'
import React from 'react'
import Navbar from './Navbar'
import "./home.css";
import ChatHistory from './ChatHistory';
import OneChat from './OneChat';
import { TextField } from '@mui/material';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Message from './Message';
import { Search, SearchOutlined } from '@material-ui/icons';
import axios from 'axios';
import SearchUsers from './SearchUsers';
import Newchat from './Newchat';



const Home = () => {
  const [commonClick, setCommonClick] = React.useState([]);

  const [users, setUsers] = React.useState([]);
  const [oneUser, setOneUser] = React.useState([]);
  var [groupName, setGroupName] = React.useState();



  return (
    <div>
      <Navbar/>
      <Container>
        <div className="homeContainer">
          <div className="left">
            <div className="title" style={{display:"flex"}}>
              <Button  style={{alignContent:"left",marginLeft:"2%"}}>
                <SearchUsers/>
              </Button>
              <div className="title">MY CHATS </div>

              <Button  style={{alignContent:"left",marginLeft:"2%"}}>
                <Newchat/>
              </Button>

            </div>
              <ChatHistory commonclick={commonClick} setcommonclick={setCommonClick}/>  
          </div>
          
          <div className="right" >
            <OneChat commonclick={commonClick} setcommonclick={setCommonClick}/>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Home