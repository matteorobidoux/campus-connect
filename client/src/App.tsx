import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Main from "./Components/Main/Main";
import MainSidebar from "./Components/MainSidebar/MainSidebar";
import NavBar from "./Components/NavBar/NavBar";
import ProfileBar from "./Components/ProfileBar/ProfileBar";
import { useGoogleOAuth } from "./custom-query-hooks/useGoogleOAuth";
import { useUser } from "./custom-query-hooks";
import Login from "./Components/Login/Login";
import CourseEntryWidget from "./Components/CourseEntryWidget/CourseEntryWidget";
import { UserClassSection } from "../../types/UserClassSection";

import { useTranslation } from "react-i18next";
import { MostRecentMessage } from "../../types/Queries/MostRecentMessage";

library.add(faCircleNotch);

export default function App() {
  const query = useGoogleOAuth();
  const user = useUser();
  const [selectedComponent, selectComponent] = useState("calender");
  const [isOpen, setIsOpen] = useState(false);
  const [isReturningFromGoogleAuth, setIsReturningFromGoogleAuth] =
    useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(query.data?._id);
  const [selectedChat, selectChat] = useState<UserClassSection | null>(null);
  const [profileUrl, changeProfileImg] = useState("");
  const [mostRecentMessage, setMostRecentMessage] = useState({message: "", username: ""} as MostRecentMessage)

  const { t, i18n } = useTranslation(["app"]);

  useEffect(() => {
    if (query.isSuccess) {
      if (query.data) {
        setIsLoggedIn(typeof query.data._id !== "undefined");
        window.history.pushState("", "Index", "/");
        setIsReturningFromGoogleAuth(true);
        return;
      }
      setIsReturningFromGoogleAuth(false);
    }
  }, [query.data, query.isSuccess]);

  useEffect(() => {
    setIsLoggedIn(user !== undefined);
  }, [user]);

  useEffect(() => {
    if (isLoggedIn) {
      setIsReturningFromGoogleAuth(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (user !== undefined) {
      if(profileUrl !== ""){
        changeProfileImg(profileUrl)
      } else if (user.picture !== undefined) {
        changeProfileImg(user.picture)
      } else {
        changeProfileImg("");
      }
    }
  }, [user]);
  // TODO: what should the type of e be?
  function openProfileBar() {
    if(isLoggedIn){
      setIsOpen(!isOpen)
    }
  }

  function switchComponent(component: string) {
    selectComponent(component);
  }

  function selectNewChat(course: UserClassSection | null) {
    selectChat(course);
  }

  function setProfileImg(url: string | null) {
    if (url) {
      changeProfileImg(url)
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="app-container">
        <NavBar toggleSidebar={openProfileBar} profileUrl={profileUrl} />
        <div className="app-content-container">
          {isLoggedIn && (
            <>
              <MainSidebar
                selectedComponent={selectedComponent}
                selectChatFunc={selectNewChat}
                selectComponentFunc={switchComponent}
                mostRecentMessage={mostRecentMessage}
                setMostRecentMessage={setMostRecentMessage}
              />
              <Main
                selectedComponent={selectedComponent}
                selectedChat={selectedChat}
                setMostRecentMessage={setMostRecentMessage}
              />
            </>
          )}
          {!isLoggedIn && isReturningFromGoogleAuth && <CourseEntryWidget />}
          {!isReturningFromGoogleAuth && !isLoggedIn && <Login />}
        </div>
        <ProfileBar isOpen={isOpen} toggleFunc={openProfileBar} changeProfileImg={setProfileImg} profileUrl={profileUrl}/>
      </div>
    </>
  );
}