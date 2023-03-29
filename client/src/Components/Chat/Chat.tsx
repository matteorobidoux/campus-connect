import styles from "./Chat.module.scss";
import Message from "../Message/Message";
import { useEffect, useRef, useState } from "react";
import { ChatMessage, useChat } from "../../chat";
import { UserClassSection } from "../../../../types/UserClassSection";
import { useSections, useUser } from "../../custom-query-hooks";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { AddMessage } from "../../../../types/Queries/AddMessage";
import { LatestMessage } from "../../../../types/Queries/LatestMessage";
type ChatProps = {
  selectedChat: UserClassSection;
};

const formatDate = (date: Date) => {
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export default function Chat({ selectedChat }: ChatProps) {
  const user = useUser();
  const sections = useSections({ userClassSections: user.sections });
  const [messages, _setMessages] = useState<ChatMessage[]>([]);
  const textRef = useRef<HTMLInputElement>(null);
  const messageToScrollRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const lastMessageRefState = useState<HTMLDivElement | null>(null);
  const mainChatRef = useRef<HTMLDivElement>(null);
  const [loadedMsgIndex, setIndex] = useState(0);
  const { data, status } = useQuery(["loading", selectedChat, loadedMsgIndex], loadMessages,{refetchOnWindowFocus: false, cacheTime: 0 });
  const queryClient = useQueryClient();
  const [justLoadedFromDb, setJustLoadedFromDb] = useState(false);
  const [msgCount, setMsgCount] = useState(0);



  async function loadMessages(){
    setJustLoadedFromDb(true);
    const loadLatestMessages = await axios.get("/api/getLatestMessages",
     {params: {room: selectedChat, loadedMsgIndex: loadedMsgIndex}}
    );
   return loadLatestMessages.data;
  }

  useEffect(() => {
    if (data) {
      setJustLoadedFromDb(false);
      //lastMessageRef = data[data.lenght]
      _setMessages((currentMessages) => [...data, ...currentMessages]);
    }
    if (data != null) {
      // scrollToTop();
    }
  }, [data])

  const chat = useChat({
    rooms: [selectedChat],
    onMessage: (m) => {
      if(m.room.courseNumber + m.room.sectionNumber !== selectedChat.courseNumber + selectedChat.sectionNumber) return;
      m.date = new Date(m.date);
      setMessages(m);
      lastMessageRef.current?.scrollIntoView();
    },
  });

  const setMessages = (c: ChatMessage) => {
    _setMessages((currentMessages) => [...currentMessages, c]);
  };

  const onEnter = (message: string) => {
    if (message === "") return;
    const pMessage = {
      message,
      room: selectedChat,
      user: { _id: user._id, username: user.name },
      date: new Date(),
    };
    chat.sendMessage(pMessage);
    setMessages(pMessage);
  };

  const onKeyUp = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      onEnter(textRef.current!.value);
      textRef.current!.value = "";
    }
  };

  useEffect(() => {
    /*if (justLoadedFromDb) {
      setJustLoadedFromDb(false);
      return;
    }*/
    // lastMessageRef.current?.scrollIntoView();
  }, [messages]);

  function onScroll(){
    if(mainChatRef.current?.scrollTop === 0){
      setIndex(loadedMsgIndex+1);
    }
  }

  function scrollToTop(){
    if(mainChatRef.current != undefined && loadedMsgIndex > 0){
      let height = lastMessageRef.current?.offsetHeight;
      if(height != undefined) {
       // height = (height + 15) * 15
      }

      console.log(height);
      let scrollOptions = {
        top: height
      }
      setTimeout(() => (mainChatRef.current?.scrollTo(scrollOptions)),500);
    
  }

  useEffect(() => {
    if (!justLoadedFromDb) {
      
    }
    messageToScrollRef.current?.scrollIntoView();
  }, [messageToScrollRef])

  return (
    <>
      {/* {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && ( */}
      <div className={styles["main-chat"]}>
        <div className={styles["msger"]}>
          <div className={styles["msger-header"]}>
            <div className={styles["msger-header-title"]}>
              <i className={styles["fas fa-comment-alt"]}></i>
              {
                sections.data?.find(
                  (s) => s.courseNumber === selectedChat.courseNumber
                )?.courseTitle
              }
            </div>
            <div className={styles["msger-header-options"]}>
              <span>
                <i className={styles["fas fa-cog"]}></i>
              </span>
            </div>
          </div>

          <main className={styles["msger-chat"]} onScroll={() => onScroll()} ref={mainChatRef}>
            {messages.splice(0, 1).map((message, i) => (
              <div ref={messageToScrollRef}>
                {generateChatMessage(message, i, user._id)}
              </div>
            ))}
            {messages.map((message, i) => (
              <div ref={lastMessageRef}>
                {generateChatMessage(message, i, user._id)}
              </div>
            ))};
          </main>

          <div className={styles["msger-inputarea"]}>
            <input
              type="text"
              className={styles["msger-input"]}
              placeholder="Enter your message..."
              onKeyUp={onKeyUp}
              ref={textRef}
            ></input>
          </div>
        </div>
      </div>
      {/* )}; */}
    </>
  );
}


function generateChatMessage(message: ChatMessage, i: number, userID: string) {
  return <Message
  leftOrRight={
    message.user._id === userID ? "right-msg" : "left-msg"
  }
  user={message.user.username}
  message={message.message}
  time={formatDate(message.date)}
  key={i}
/>
}