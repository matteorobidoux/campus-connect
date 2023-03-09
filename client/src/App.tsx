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
import { useUser } from './custom-query-hooks';
import Login from './Components/Login/Login';
import CourseEntryWidget from './Components/CourseEntryWidget/CourseEntryWidget';
import { UserClassSection } from '../../types/UserClassSection';

import { useTranslation } from 'react-i18next';

library.add(faCircleNotch)

export default function App() {
  const query = useGoogleOAuth();
  const user = useUser();
  const [selectedComponent, selectComponent] = useState("calender");
  const [isOpen, setIsOpen] = useState(false);
  const [isReturningFromGoogleAuth, setIsReturningFromGoogleAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(query.data?._id)
  const [selectedChat, selectChat] = useState<UserClassSection | undefined>(undefined);


  const {t, i18n} = useTranslation(['app']);

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
    setIsLoggedIn(user != undefined)
  }, [user])

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

  function selectNewChat(course: UserClassSection) {
    selectChat(course)
  }

  return (
    <>
      <ToastContainer />
      <div className="app-container">
        <NavBar toggleSidebar={openProfileBar} />
        <div className="app-content-container">
          { isLoggedIn && <> 
            <MainSidebar selectedComponent={selectedComponent} selectChatFunc={selectNewChat} selectComponentFunc={switchComponent}/> 
            <Main selectedComponent={selectedComponent} selectedChat={selectedChat}/>
          </>}
          { !isLoggedIn && isReturningFromGoogleAuth && ( <CourseEntryWidget />)}
          { !isReturningFromGoogleAuth && !isLoggedIn && <Login />}
        </div>
        <ProfileBar isOpen={isOpen} toggleFunc={openProfileBar} />
      </div>
    </>
  );
}
