import { Button } from '@mui/material';
import styled from 'styled-components';
import { auth, provider } from '../firebase';

function Login() {
  
  const signIn =(e)=> {
    e.preventDefault();
    auth.signInWithPopup(provider)
    .catch((error)=> alert(error.message));
  };

  return (
    <LoginContainer>
      <InnerContainer>
        <img src="https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_59869c917b4a1f76b309e4278b1bca1c/zoho-connect.png" 
        alt=""/>
        <h1>Sign In</h1>
        <p>Welcome to konnect</p>
        <Button onClick={signIn}>Sign In</Button>
      </InnerContainer>
    </LoginContainer>
  )
}

export default Login;

const LoginContainer = styled.div`
  background-color: gray;
  height: 100vh;
  display: grid;
  place-item: center;
`;

const InnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: #eee;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

>img {
  object-fit: contain;
  height: 100px;
  margin-bottom: 40px;
}

>button{
  margin-top: 4vmin;
  text-transform: inherit !important;
  background-color: #0a8d48 !important;
  color:var(--text-white);
}
`;

