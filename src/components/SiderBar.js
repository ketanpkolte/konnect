import AddIcon from '@mui/icons-material/Add';
import AppsIcon from '@mui/icons-material/Apps';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CreateIcon from '@mui/icons-material/Create';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import InboxIcon from '@mui/icons-material/Inbox';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import SideBarOption from './SideBarOption';
//import { getFirestore, collection } from 'firebase/firestore';

function SiderBar() {

  const[ channels] = useCollection(db.collection("rooms"))
  const [user]= useAuthState(auth);
  
  return (
    <SideBarContainer>
      <SideBarHeader>
        <SiderBarInfo>
          <h2>Account Name</h2>
          <h3><FiberManualRecordIcon/>{user.displayName}</h3>
        </SiderBarInfo>
        <CreateIcon/>
      </SideBarHeader>

      <SideBarOption Icon={InsertCommentIcon} title="Threads" />
      <SideBarOption Icon={InboxIcon} title="Mentions & reactions" />
      <SideBarOption Icon={DraftsIcon} title="Saved items" />
      <SideBarOption Icon={BookmarkBorderIcon} title="channedl browser" />
      <SideBarOption Icon={PeopleAltIcon} title="People & user group"/>
      <SideBarOption Icon={AppsIcon} title="Apps" />
      <SideBarOption Icon={FileCopyIcon} title="File Browser" />
      <SideBarOption Icon={ExpandLessIcon} title="Show less" />
      
      <hr/>
      <SideBarOption Icon={ExpandMoreIcon} title="Channels"/>
      <hr/>

      <SideBarOption Icon={AddIcon} addChannelOption title="Add Channel" />

      {channels?.docs.map(doc =>(
        <SideBarOption 
        key={doc.id}
        id={doc.id}
        title={doc.data().name}/>
      ))}
    </SideBarContainer>
  )
}

export default SiderBar;

const SideBarContainer = styled.div`
  flex: 30%;
  color: var(--text-white);
  background-color: var(--konnect-color);
  max-width: 260px;
  margin-top: 58px;
  border-top: 3px solid #49274b;
  overflow-y: scroll;
   
  &::-webkit-scrollbar {
    display: none;
  }

  >hr{
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;

const SideBarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid var(--border-gray);
  padding: 13px;

  >.MuiSvgIcon-root{
    padding :8px;
    background-color: var(--text-white);
    font-size: 18px;
    color: #49274b;
    border-radius: 999px;
  }
`;

const SiderBarInfo = styled.div`
  flex: 1;

  >h2 {
    font-size: 1.2em;
    font-weight: 600;
    margin-bottom: 5px;   
  }

  >h3 {
    display: flex;
    font-size: 0.8em;
    font-weight:400;
    align-item: center;
  }

  >h3 .MuiSvgIcon-root {
    font-size: 1em;
    margin-top: 1px;
    margin-right: 2px;
    color: var(--fiber-green);
  }
`;
