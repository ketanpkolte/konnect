import { useAuthState } from 'react-firebase-hooks/auth';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import Spinner from 'react-spinkit';
import styled from 'styled-components';
import './App.css';
import Chat from './components/Chat';
import Header from './components/Header';
import Login from './components/Login';
import SideBar from './components/SiderBar';
import { auth } from './firebase';

function App() {

  const [user, loading] = useAuthState(auth);

  if(loading){
    return(
      <Loading>
        <LoadingSpinner>
          <img src="https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_59869c917b4a1f76b309e4278b1bca1c/zoho-connect.png"
          alt=""/>
          <Spinner
            name="folding-cube"
            color="black"
            fadeIn="none"/>
        </LoadingSpinner>
      </Loading>
    )
  }

  return (
    <div className="app">
    <Router>
      {!user ? (<Login/>):(
        <>
        <Header />
        <AppBody>
          <SideBar/>
            <Routes>
              <Route path="/" element={<Chat/>}>
            </Route>
          </Routes>
        </AppBody>
        </>
      )}    
    </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const Loading = styled.div`
  display: grid;
  place-item: center;
  height: 100vh;
  width: 100vw;
  background-color: #eee;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;

  >img{
    height: 100px;
    padding: 20px;
    margin-bottom:40px;
}
`;