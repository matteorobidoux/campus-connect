import styles from "./Chat.module.scss"
import Message from "../Message/Message"
import { useEffect, useRef, useState } from "react"
import { ChatMessage, useChat } from "../../chat";
import { UserClassSection } from "../../../../types/UserClassSection";
import { useSections, useUser } from "../../custom-query-hooks";

type ChatProps = {
  selectedChat : UserClassSection;
}

//TODO: Change main bar depending on component selected
//TODO: Change message input/button/route depending on groupchat selected
//TODO: Make message into components
//
const formatDate = (date: Date) => {
  return date.toLocaleString('en-US', { hour: 'numeric', minute: "2-digit", hour12: true })
}

export default function Chat({ selectedChat }: ChatProps) {
  const user = useUser();
  const sections = useSections({userClassSections: user.sections});
  const [messages, _setMessages] = useState<ChatMessage[]>([]);
  const textRef = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const chat = useChat({rooms: [selectedChat], onMessage: (m) => {
    m.date = new Date(m.date);
    setMessages(m)
    lastMessageRef.current?.scrollIntoView()
  }
  });

  const setMessages = (c: ChatMessage) => {
    _setMessages((currentMessages) => [...currentMessages, c]);
  }

  const onEnter = (message: string) => {
    if (message === "") return;
    const pMessage = {message, room: selectedChat, user: {_id: user._id, username: user.name}, date: new Date()}
    chat.sendMessage(pMessage);
    setMessages(pMessage);
  }

  const onKeyUp = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      onEnter(textRef.current!.value);
      textRef.current!.value = "";
    }
  }

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView()
  }, [messages])

  return (
    <>
      <div className={styles["main-chat"]}>
        <div className={styles["msger"]}>
          <div className={styles["msger-header"]}>
            <div className={styles["msger-header-title"]}>
              <i className={styles["fas fa-comment-alt"]}></i> 
              {sections.data?.find(s => s.courseNumber === selectedChat.courseNumber)?.courseTitle}
            </div>
            <div className={styles["msger-header-options"]}>
              <span><i className={styles["fas fa-cog"]}></i></span>
            </div>
          </div>

          <div className={styles["msger-chat"]}>
            {messages.map((message, i) => 
              <div ref={lastMessageRef}>
                <Message leftOrRight={message.user._id === user._id ? "right-msg" : "left-msg"}
                  user={message.user.username} message={message.message} time={formatDate(message.date)} key={i} />
              </div>
            )}

          </div>

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
    </>
  )
}
