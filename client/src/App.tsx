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
import { UserClassSection } from "../../types/UserClassSection";

import { useTranslation } from "react-i18next";
import { LayoutGroup, motion } from "framer-motion";

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
    if (isLoggedIn) {
      setIsReturningFromGoogleAuth(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setIsLoggedIn(user !== undefined);
    if (user !== undefined) {
      if (user.picture !== undefined) {
        changeProfileImg(user.picture);
      } else {
        changeProfileImg("");
      }
    }
  }, [user]);

  function openProfileBar() {
    if (isLoggedIn) {
      setIsOpen(!isOpen);
    }
  }

  function switchComponent(component: string) {
    selectComponent(component);
  }

  function selectNewChat(course: UserClassSection | null) {
    selectChat(course);
  }

  return (
    <>
      <ToastContainer />
      <LayoutGroup>
        <motion.div
          className="app-container"
          layout="position"
          transition={{ duration: 0.2 }}
        >
          <NavBar toggleSidebar={openProfileBar} profileUrl={profileUrl} />
          <div className="app-content-container">
            <LayoutGroup>
              {isLoggedIn && (
                <>
                  <MainSidebar
                    selectedComponent={selectedComponent}
                    selectChatFunc={selectNewChat}
                    selectComponentFunc={switchComponent}
                    user={user}
                  />
                  <Main
                    selectedComponent={selectedComponent}
                    selectedChat={selectedChat}
                  />
                </>
              )}
              {!isLoggedIn && (
                <Login
                  returningFromGoogleAuth={isReturningFromGoogleAuth}
                  givenName={
                    query.isSuccess ? query.data["given_name"] : undefined
                  }
                  familyName={
                    query.isSuccess ? query.data["family_name"] : undefined
                  }
                />
              )}
            </LayoutGroup>
          </div>
          <ProfileBar
            isOpen={isOpen}
            toggleFunc={openProfileBar}
            profileImageUrl={user.picture}
          />
        </motion.div>
      </LayoutGroup>
    </>
  );
}
