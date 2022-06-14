import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SearchIcon from '@mui/icons-material/Search';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth } from '../firebase';

function Header() {

  const [user] = useAuthState(auth);

  return (
    <HeaderContainer>

      <HeaderLeft>
        <HeaderAvatar
        src={user?.photoURL}
        alt={user?.displayName}/>
        <ExitToAppIcon onClick={()=>auth.signOut()}/>
        <AccessTimeIcon/>
      </HeaderLeft>

      <HeaderSearch>
        <SearchIcon />
        <input placeholder='Search' />
      </HeaderSearch>

      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>

    </HeaderContainer>
  )
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 9px 0;
  color: white;
  background-color: var(--konnect-color)
 `;

const HeaderLeft = styled.div`
  flex: 30%;
  display: flex;
  align-items: center;
  margin-left: 20px;
   
  >.MuiSvgIcon-root{
    margin-left: auto;
    margin-right: 40px;
    cursor: pointer;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  &:hover{
    opacity: 0.9;
  }
`;

const HeaderSearch = styled.div`
  flex: 40%;
  display: flex;
  opacity: 1;
  text-align: center;
  border-radius: 5px;
  background-color: var(--header-search);

  > input{
    color: var(--text-white);
    background-color: transparent;
    min-width: 30vw;
    text-align: center;
    outline: 0;
    border: none;
  }
`;

const HeaderRight = styled.div`
  flex: 30%;
  display: flex;
  align-item: flex-end;

  > .MuiSvgIcon-root{
    margin-left: auto;
    margin-right: 50px;
    cursor: pointer;
  }
`;