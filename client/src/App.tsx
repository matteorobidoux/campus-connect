import { useState } from 'react';
import './App.css';
import Main from './Components/Main/Main';
import MainSidebar from './Components/MainSidebar/MainSidebar';
import NavBar from './Components/NavBar/NavBar';
import ProfileBar from './Components/ProfileBar/ProfileBar';

export default function App() {

  const [isOpen, openOrClose] = useState(false)

  // TODO: what should the type of e be?
  function openProfileBar(e: any) {
    openOrClose(!isOpen)
  }

  return (
    <div className='app-container'>
      <NavBar toggleSidebar={openProfileBar} />
      <div className="app-content-container">
        <MainSidebar />
        <Main />
      </div>
      <ProfileBar isOpen={isOpen} toggleFunc={openProfileBar} />
    </div>
  );
}
