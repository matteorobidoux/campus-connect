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
import { MostRecentMessage } from "../../types/Queries/MostRecentMessage";
import { LayoutGroup, motion } from "framer-motion";

library.add(faCircleNotch);

export default function App() {
  const query = useGoogleOAuth();

  if (query.isError) {
    // do nothing
  }
  const user = useUser();
  const [selectedComponent, selectComponent] = useState("calender");
  const [isOpen, setIsOpen] = useState(false);
  const [isReturningFromGoogleAuth, setIsReturningFromGoogleAuth] =
    useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(query.data?._id);
  const [selectedChat, selectChat] = useState<UserClassSection | null>(null);
  const [profileUrl, changeProfileImg] = useState("");
  const [mostRecentMessage, setMostRecentMessage] = useState<
    Map<string, MostRecentMessage>
  >(new Map());

  const { t, i18n } = useTranslation(["app"]);

  function setMostRecentMessageById(id: string, message: MostRecentMessage) {
    // let index: number = parseInt(id.replace(/\D/g,''));
    // debugger;
    setMostRecentMessage((old) => {
      old.set(id, message);
      return new Map(old);
    });
  }

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
  }, [query.isSuccess]);

  useEffect(() => {
    if (isLoggedIn) {
      setIsReturningFromGoogleAuth(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setIsLoggedIn(user !== undefined);
    if (user !== undefined) {
      if (profileUrl !== "") {
        changeProfileImg(profileUrl);
      } else if (user.picture !== undefined) {
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

  function setProfileImg(url: string | null) {
    if (url) {
      changeProfileImg(url);
    }
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
          <NavBar
            toggleSidebar={openProfileBar}
            profileUrl={profileUrl}
            logoOnClick={
              isLoggedIn
                ? () => {
                    switchComponent("calendar");
                  }
                : () => {}
            }
          />
          <motion.div
            className="app-content-container"
            layout="preserve-aspect"
          >
            <LayoutGroup>
              {isLoggedIn && (
                <>
                  <MainSidebar
                    selectedComponent={selectedComponent}
                    selectChatFunc={selectNewChat}
                    selectComponentFunc={switchComponent}
                    mostRecentMessage={mostRecentMessage}
                    setMostRecentMessageById={setMostRecentMessageById}
                    user={user}
                  />
                  <Main
                    selectedComponent={selectedComponent}
                    selectedChat={selectedChat}
                    setMostRecentMessageById={setMostRecentMessageById}
                  />
                  <ProfileBar
                    isOpen={isOpen}
                    toggleFunc={openProfileBar}
                    profileUrl={user?.picture}
                    changeProfileImg={setProfileImg}
                  />
                </>
              )}
              {!isLoggedIn && (
                <Login
                  returningFromGoogleAuth={isReturningFromGoogleAuth}
                  givenName={
                    query.isSuccess && query.data
                      ? query.data["given_name"]
                      : undefined
                  }
                  familyName={
                    query.isSuccess && query.data
                      ? query.data["family_name"]
                      : undefined
                  }
                />
              )}
            </LayoutGroup>
          </motion.div>
        </motion.div>
      </LayoutGroup>
    </>
  );
}
