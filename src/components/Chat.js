import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { useEffect, useRef } from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectRoomId } from '../features/appSlice';
import { db } from '../firebase';
import ChatInput from './ChatInput';
import Message from './Message';

function Chat() {

  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);

  const [ roomDetails ]= useDocument(
    roomId && db.collection('rooms').doc(roomId)
  );

  const [ roomMessages, loading ] = useCollection(
    roomId && 
      db.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .orderBy('timestamp','asc')
  );

  //console.log(roomDetails?.data());
  //console.log(roomMessages);

  useEffect(()=>{
    chatRef?.current?.scrollIntoView({
      behavior: "smooth"}
    );
  },[ roomId, loading ]);

  return (
    <ChatContainer>
        {roomDetails && roomMessages && (<>
      <ChatHeader>
        <ChatHeaderLeft>
          <h4><strong>#{roomDetails?.data().name}</strong></h4>
          <StarBorderOutlinedIcon/>
        </ChatHeaderLeft>

        <ChatHeaderRight>
          <p>
            <InfoOutlinedIcon/> Details
          </p>
        </ChatHeaderRight>
      </ChatHeader>

      <ChatMessages>
        {roomMessages?.docs.map(
          doc =>{
            const{message, timestamp, user, userImage}=doc.data();
            
            return(
              <Message
              key={doc.id}
              message={message}
              timestamp={timestamp}
              user={user}
              userImage={userImage}
              />
            )
          }
        )}
        <ChatBottom ref={chatRef} />
      </ChatMessages>

      <ChatInput
        chatRef={chatRef}
        channelName={roomDetails?.data().name}
        channelId={roomId} />
      </>
      )}
    </ChatContainer>
  )
}

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 58px;
`;

const ChatHeader = styled.div`
  position: fixed;
  background-color: white;
  display: flex;
  width: 75vw;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 2px solid var(--border-lightgray);
`;

const ChatHeaderLeft = styled.div`
  display: flex;
  align-items: center;

  >h4{
    disply: flex;
    text-transform: lowercase;
  }
  
  >.MuiSvgIcon-root{
    margin-left: 10px;
    font-size: 18px;
  }
`;

const ChatHeaderRight = styled.div`
  >p {
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  >p >.MuiSvgIcon-root {
  margin-right: 5px !important;
  font-size: 16px;
}
`;

const ChatMessages = styled.div`
`;

const ChatBottom = styled.div`
  margin-bottom:100px;
`;
