import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect } from 'react'
import {Cancel, ControlCameraOutlined, Send} from '@material-ui/icons';
import { RemoveRedEyeOutlined } from '@material-ui/icons';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Message from './Message';
import axios from 'axios';


const useStyles=makeStyles({
    send:{
        margin:"20px",
        padding:"10px",
        minWidth:"100px",
        display:"flex", 
        bottom: "0",
        width: "90%",
      //  position:"absolute",
        
    },
    chatwindow:{
       alignContent:"left"
    }, 
})
const OneChat = ({commonclick,setcommonclick }) => {
 const classes=useStyles();
 const [open, setOpen] = React.useState(false);
 const [message, setMessage] = React.useState('');

 var userName=[];

 const [LoadMessagesFromDb,setLoadMessagesFromDb]=React.useState([]);
 const [GrpToUsername,setGrpToUsername]=React.useState([]);
 useEffect(()=>{
    console.log(commonclick)
    axios.get(`http://localhost:5000/message/${commonclick[0]}`,commonclick[0])///commonclick[0]=conversation ID
        .then((res)=>{console.log(res,"+response from db");
             setLoadMessagesFromDb(res.data);})
        .then(console.log("GOT MESSAGES FROM DB",LoadMessagesFromDb))
    
    let commonclickfive=commonclick[5];
    axios.post(`http://localhost:5000/signup/getNames`,commonclickfive)///commonclick[5]=array of user ids
    .then((res)=>{console.log(res,"+response from MAPPPP");//to map userid to name to show on click grp icon
                    setGrpToUsername(res.data)})
     },[commonclick,message])//if someone clicks chathistory's chat,it opens up messages
 
 const handleClickOpen = () => {
   setOpen(true);
 };

 const handleClose = () => {
   setOpen(false);
 };

 const handleMessage=async(value)=>{
    console.log("value handle message on btn clikc==",value)
   setMessage(value);
   const newItem={content:message,sender:localStorage.getItem("id"),cid:commonclick[0]};//**** */change sender to user got after decoding token in local storge using jwt
   await axios.post("http://localhost:5000/message",newItem);
 }

 const DeleteUser=(name)=>{
    alert("Will Delete USER,",name)
    //const newItem={content:message,sender:localStorage.getItem("id"),cid:commonclick[0]};//**** */change sender to user got after decoding token in local storge using jwt
    //await axios.post("http://localhost:5000/message",newItem);
  }

  return (
    <div >
            <div className="chatname" style={{fontWeight:"bold",fontSize:"xx-large",boxShadow:"0px 0px 10px -5px",borderRadius:"5%",padding:"10px",overflow:"none"}}>
                {commonclick[1]}

                <span variant="outlined" onClick={handleClickOpen} style={{alignContent:"right",marginLeft:"20%",cursor:"pointer"}}>
                    <RemoveRedEyeOutlined/>
                </span>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{commonclick[1]}</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                    Group Members<br/>
                    <div style={{display:"flex"}}>
                    { //to map user id got by clicking convo....mapping to usernames*******/
                        commonclick[5]!==undefined && commonclick[5]!==[]
                        ?
                        GrpToUsername.map((name,index)=>{
                            ///*************CANT USE ASYNC CODE IN JSX */
                            return(             
                                <div key={index} style={{backgroundColor:"blue",color:"white",margin:"3%",padding:"2%",width:"min-content",borderRadius:"17%",display:"flex"}}>
                                    {name}
                                    <div style={{cursor:"pointer"}} onClick={(e)=>{DeleteUser(e.target.value)}} value={name}><Cancel/></div>
                                </div>
                            ) 
                             })  
                        :
                        console.log("hi")}
                       </div>
                   </DialogContentText>
                   
                    <DialogContentText>
                        Add user to group
                     
                    <TextField autoFocus margin="dense" id="name" label="enter user name" type="email" fullWidth variant="standard"/>             
                    <Button onClick={handleClose}>Add user</Button>     
                    </DialogContentText> 
                    <br/><br/>
                    <DialogContentText>
                        Update Group Name
                    </DialogContentText>
                    <TextField autoFocus margin="dense" id="name" label="new chat name" type="email" fullWidth variant="standard"/>
                    <Button onClick={handleClose}>Update</Button>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Leave group</Button>
                    </DialogActions>
                </Dialog>

            </div>


        <div className={classes.chatWindow}>
            {
             LoadMessagesFromDb.map((oneMessage,index)=>{
                let isYou=(oneMessage.sender===localStorage.getItem("id"));
                return <> 
                        <div className="messages"><Message you={isYou} commonclick={commonclick} setcommonclick={setcommonclick} content={oneMessage.content} key={index}/></div>  
                       </>
                    })
                }
        </div>

        <div className={classes.send}>
         <TextField fullWidth variant='outlined' label="enter message" onChange={(e)=>{setMessage(e.target.value)}}></TextField>
         <Button onClick={(e)=>{handleMessage(e.target.value)}} >
            <Send/>
         </Button>
        </div>
    </div>
  )
}

export default OneChat