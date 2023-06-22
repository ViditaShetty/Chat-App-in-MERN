import { Container } from '@material-ui/core'
import React, { useEffect,useState } from 'react'
import {makeStyles} from '@material-ui/styles';
import img1 from "./img1.jpg";
import axios from "axios";
import jwtDecode from 'jwt-decode'

const useStyles=makeStyles({
    chathistory:{
        boxShadow:"0px 0px 12px -7px",
        margin:"20px",
       display:"flex",
       justifyContent:"left",
       alignItems:"center",
   //    fontSize:"20px",
       
    },
    img:{
    borderRadius:"50%",
    margin: "10px",
    height: "42px",
    width: "42px",
    objectFit: "cover"
   }
})
const ChatHistory = ({commonclick,setcommonclick}) => {

const classes=useStyles();
const [grps,setgrps]=useState([]);
//on loading app,all grps with grp name & profile pic shouls show
useEffect( ()=>{
  //get user id from token in localstorage
  //then get chathistory which user is a part of
  //by passing id to backend and using $all operator*****************
   const id=localStorage.getItem("id")

   axios.get(`http://localhost:5000/chats/${id}`,)
               .then((data)=>{
                     console.log("res got from chatHostory on click chat=",data.data)
                     setgrps(data.data)
               })
  console.log("commonclick FROM CHATHISTORY+",commonclick)
            },
  [commonclick])

   return (  <>   
 {grps.map((grp)=>{
    console.log("name grp=",grp)
    return(    //******object cant be passed as react child so pass an array of only values not keys to onechat component */
        <div onClick={()=>setcommonclick(Object.values(grp))} style={{cursor:"pointer"}} key={grp._id}>
         <div className={classes.chathistory} style={{textAlign:"left",margin:"10px",padding:"10px"}}>
         <img src={img1} alt="img" className={classes.img}></img>
         <div>
            <div className="title">
                 {grp.nameGroup}
            </div>
         
          <div className="lmessage">
                    <span>User</span>
                    :
                    <span>Latest Message</span>
          </div>
         </div> </div> 
        </div>
            )
           })

         }    
         
         { }   
 </>   )
}

export default ChatHistory