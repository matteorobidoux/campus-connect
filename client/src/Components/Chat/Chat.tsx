import styles from "./Chat.module.scss";
import Message from "../Message/Message";
import { useEffect, useRef, useState } from "react";
import { ChatMessage, useChat } from "../../chat";
import { UserClassSection } from "../../../../types/UserClassSection";
import { useSections, useUser } from "../../custom-query-hooks";
import { useMutation } from "react-query";
import axios from "axios";
import { AddMessage } from "../../../../types/Queries/AddMessage";
import { LatestMessage } from "../../../../types/Queries/LatestMessage";
type ChatProps = {
  selectedChat: UserClassSection;
};

//TODO: Change main bar depending on component selected
//TODO: Change message input/button/route depending on groupchat selected
//TODO: Make message into components
//
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
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const mainChatRef = useRef<HTMLDivElement>(null);
  const [loadedMsgIndex, setIndex] = useState(0);

  //const data = {room: selectedChat, loadedMsgIndex: 1};
  useEffect(() => {
    const loadLatestMessages = async () => await axios.get("/api/getLatestMessages",
     {params: {room: selectedChat, loadedMsgIndex: loadedMsgIndex}}
    );

    loadLatestMessages().then((res) => {
      console.log(res.data)
      if (res.data) {
        res.data.forEach((msg: ChatMessage) => {
          setMessages(msg,2);
        });
      }
      if(res.data != null){
        scrollToTop();
      }
    }).catch((err) => {
      console.log(err)
    })
  }, [loadedMsgIndex])

  const chat = useChat({
    rooms: [selectedChat],
    onMessage: (m) => {
      if(m.room.courseNumber + m.room.sectionNumber !== selectedChat.courseNumber + selectedChat.sectionNumber) return;
      m.date = new Date(m.date);
      setMessages(m,1);
      lastMessageRef.current?.scrollIntoView();
    },
  });

 /* useEffect(() => {
    loadedMessageArray.forEach((msg: ChatMessage) => {
      _setMessages((currentMessages) => [...currentMessages, msg]);
    });
  }, [loadedMessageArray])*/


  const setMessages = (c: ChatMessage, messagesNum: number) => {
    if(messagesNum > 1) {
    _setMessages((currentMessages) => [c,...currentMessages]);
    }
    else {
      _setMessages((currentMessages) => [...currentMessages, c]);
    }
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
    setMessages(pMessage,1);
  };

  const onKeyUp = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      onEnter(textRef.current!.value);
      textRef.current!.value = "";
    }
  };

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView();
  }, [messages]);

  function onScroll(){
    if(mainChatRef.current?.scrollTop === 0){
      setIndex(loadedMsgIndex+1);
    }
  }

  function scrollToTop(){
    if(mainChatRef.current != undefined && loadedMsgIndex > 0){
      let scrollOptions = {
        top: 1000
      }
      setTimeout(() => (mainChatRef.current?.scrollTo(scrollOptions)),500);
    }
  }

  return (
    <>
      <div className={styles["main-chat"]}>
        <section className={styles["msger"]}>
          <header className={styles["msger-header"]}>
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
          </header>

          <main className={styles["msger-chat"]} onScroll={() => onScroll()} ref={mainChatRef}>
            {messages.map((message, i) => (
              <div ref={lastMessageRef}>
                <Message
                  leftOrRight={
                    message.user._id === user._id ? "right-msg" : "left-msg"
                  }
                  user={message.user.username}
                  message={message.message}
                  time={formatDate(message.date)}
                  key={i}
                />
              </div>
            ))}
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
        </section>
      </div>
    </>
  );
}
