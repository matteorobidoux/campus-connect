import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import Main from './Components/Main/Main';
import MainSidebar from './Components/MainSidebar/MainSidebar';
import NavBar from './Components/NavBar/NavBar';
import ProfileBar from './Components/ProfileBar/ProfileBar';
import { useGoogleOAuth } from './custom-query-hooks/useGoogleOAuth';
import { useAddUserMutataion } from './custom-query-hooks';
import { RegisterInfo } from '../../types/Queries/GAuth';

library.add(faCircleNotch)

export default function App() {
  const query = useGoogleOAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isReturningFromGoogleAuth, setIsReturningFromGoogleAuth] = useState(false);
  const addUser = useAddUserMutataion();

  useEffect(() => {
    if (query.isSuccess) {
      if (query.data) {
        window.history.pushState('', 'Index', '/');
        setIsReturningFromGoogleAuth(true);
        return;
      }
      setIsReturningFromGoogleAuth(false);
    }
  }, [query.data])


  // TODO: what should the type of e be?
  function openProfileBar() {
    setIsOpen(!isOpen)
  }

  const onSubmit = (info: RegisterInfo) => {

    addUser.mutate({
      sections: [{courseNumber: "530-292-DW", sectionNumber: "00001"}],
      name: "testUser",
      email: info.email,
      gid: info.gid,
      googleTokens: {
        access_token: info.access_token,
        refresh_token: info.refresh_token,
      }, // ! This should be only called if isReturningFromGoogleAuth == true
    });

  }



  return (
    <>
      <ToastContainer />
      <div className={"login-section"}>
        <h1> Returning ? {"" + isReturningFromGoogleAuth } </h1>
        { isReturningFromGoogleAuth && (
          <button onClick={() => onSubmit(query.data as RegisterInfo)}> Create testUser </button>
        )}
      </div>
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
