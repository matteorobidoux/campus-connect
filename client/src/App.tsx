import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import Main from './Components/Main/Main';
import MainSidebar from './Components/MainSidebar/MainSidebar';
import NavBar from './Components/NavBar/NavBar';
import ProfileBar from './Components/ProfileBar/ProfileBar';
import { useGoogleOAuth } from './custom-query-hooks/useGoogleOAuth';

library.add(faCircleNotch)

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const query = useGoogleOAuth()
  useEffect(() => {
    console.log(query.data);
  }, [query])


  // TODO: what should the type of e be?
  function openProfileBar() {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <ToastContainer />
      <div className="app-container">
        <NavBar toggleSidebar={openProfileBar} />
        <div className="app-content-container">
          <MainSidebar />
          <Main />
        </div>
        <ProfileBar isOpen={isOpen} toggleFunc={openProfileBar} />
      </div>
    </>
  );
}
