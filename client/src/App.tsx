import { useState } from 'react';
import './App.css';
import Main from './Components/Main/Main';
import MainSidebar from './Components/MainSidebar/MainSidebar';
import NavBar from './Components/NavBar/NavBar';
import ProfileBar from './Components/ProfileBar/ProfileBar';
import profileImg from "./profile.png";

export default function App() {

  const [isOpen, openOrClose] = useState({data:false})

  function openProfileBar(){
    if(isOpen.data){
      openOrClose({data:false});
    } else{
      openOrClose({data:true});
    }
  }

  return (
    <div className='app-container'>
      <NavBar>
        <img id="profile" src={profileImg} alt="profile" onClick={openProfileBar}></img>
      </NavBar>
      
      <div className="app-content-container">
        <MainSidebar />
        <Main />
      </div>
      <ProfileBar data={isOpen.data}>
        <button onClick={openProfileBar}>Close Profile Bar</button>
      </ProfileBar>
    </div>
  );
}
