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
import { useAddUserMutation, useUser } from './custom-query-hooks';
import { RegisterInfo } from '../../types/Queries/GAuth';
import Login from './Components/Login/Login';
import CourseEntryWidget from './Components/CourseEntryWidget/CourseEntryWidget';

library.add(faCircleNotch)

export default function App() {
  const query = useGoogleOAuth();
  const addUser = useAddUserMutation();
  const [selectedComponent, selectComponent] = useState("calender");
  const [isOpen, setIsOpen] = useState(false);
  const [isReturningFromGoogleAuth, setIsReturningFromGoogleAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(query.data?._id)

  const user = useUser();

  useEffect(() => {
    if (query.isSuccess) {
      if (query.data) {
        setIsLoggedIn(typeof query.data._id !== "undefined")
        window.history.pushState('', 'Index', '/');
        setIsReturningFromGoogleAuth(true);
        return;
      }
      setIsReturningFromGoogleAuth(false);
    }
  }, [query.data, query.isSuccess])

  useEffect(() => {
    if (isLoggedIn) {
      setIsReturningFromGoogleAuth(false);
    }
  }, [isLoggedIn])


  // TODO: what should the type of e be?
  function openProfileBar() {
    setIsOpen(!isOpen)
  }

  function switchComponent(component : string) {
    selectComponent(component)
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
        <h1> Logged in ? { "" + isLoggedIn }</h1>
        { isReturningFromGoogleAuth && (
          <>
          <button onClick={() => onSubmit(query.data as RegisterInfo)}> Create testUser </button>
          User {JSON.stringify(user)}
          </>
        )}
      </div>
      <div className="app-container">
        <NavBar toggleSidebar={openProfileBar} />
        <div className="app-content-container">
          { isLoggedIn && <> <MainSidebar selectComponentFunc={switchComponent}/> <Main selectedComponent={selectedComponent} /> </>}
          { isReturningFromGoogleAuth && ( <CourseEntryWidget />)}
          { !isReturningFromGoogleAuth && !isLoggedIn && <Login />}
        </div>
        <ProfileBar isOpen={isOpen} toggleFunc={openProfileBar} />
      </div>
    </>
  );
}
