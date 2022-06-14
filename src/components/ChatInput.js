import { Button } from '@material-ui/core';
import firebase from 'firebase/compat/app';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth, db } from '../firebase';
//import { doc, serverTimestamp } from "firebase/firestore";

function ChatInput({channelName, channelId, chatRef}) {
  
  const [ input, setInput ] = useState("");
  const [user] = useAuthState(auth);
  
  const sendMessage = (e) =>{
    e.preventDefault();
    
    //console.log(channelId);
    
    if(!channelId){
      return false;
    }

    /*doc(db, 'rooms', 'messages').add({
      message: input,
      timestamp: serverTimestamp(),
    });*/

   db.collection("rooms").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });
    
    chatRef.current.scrollIntoView({
      behavior: "smooth"
    });
    
    setInput("");
  };


  return (
    <ChatInputContainer>
      <form>
        <input value = {input} 
        onChange = { (e) => setInput(e.target.value) } 
        placeholder = {`Message #${channelName}`}/>
        <Button type="submit" onClick={sendMessage}>SEND</Button>
      </form>
    </ChatInputContainer>
  )
}

export default ChatInput;

const ChatInputContainer = styled.div`
border-radius: 5px;

>form{
  display: flex;
  justify-content: center;
  position: relative;
}

>form >input{
  position: fixed;
  bottom: 5vmin;
  width: 60%;
  border: 1px solid var(--border-gray);
  padding: 20px;
  outline: none;
  border-radius: 5px;
  background-color: var(--border-lightgray);
}

>form >button{
  display:none !important;
  position: fixed;
  bottom: 10px;
  padding: 10px;
}
`;