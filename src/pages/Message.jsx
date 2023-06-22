import React, { useEffect } from 'react'
import img1 from "./img1.jpg";
import "./message.css"
import {useState} from "react";

const Message = ({you,commonclick,setcommonclick,content}) => {
  const [openChat,setOpenChat]=useState("false");
  useEffect(()=>{
    console.log("messages==",commonclick)
    console.log("openchat==",openChat)

   commonclick===[] ||  commonclick===undefined || commonclick.length===0?
   setOpenChat("false") 
   :
   setOpenChat("true")
   },[commonclick])//if someone clicks chathistory's chat,it opens up messages

    
  return (
    <div>   
     {openChat==="true" ?
        <>
        <div className={`message ${you}`}>
        <img src={img1} alt="img" className={you}></img>
        <div className={`text ${you}text`}>
        {content}
        </div>       
        </div>
        <div className={`time ${you}`} style={{margin:"5%",marginTop:"0%",marginBottom:"0"}}>
            1hr ago
        </div>
        </>
        :
        <div style={{color:"grey",fontSize:"xx-large"}}>
          Open a conversation
        </div>}
    </div>
  )
}

export default Message