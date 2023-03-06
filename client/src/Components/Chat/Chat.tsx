import styles from "./Chat.module.scss"
import Message from "../Message/Message"
import { useEffect, useRef, useState } from "react"
import { ChatMessage, useChat } from "../../chat";
import { UserClassSection } from "../../../../types/UserClassSection";
import { useUser } from "../../custom-query-hooks";

type ChatProps = {
  selectedChat : UserClassSection;
}

//TODO: Change main bar depending on component selected
//TODO: Change message input/button/route depending on groupchat selected
//TODO: Make message into components

export default function Chat({ selectedChat }: ChatProps) {
  const user = useUser();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const textRef = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const chat = useChat({rooms: [selectedChat], onMessage: (m) => {
      messages.push(m);
      lastMessageRef.current?.scrollIntoView()
      setMessages([...messages]);
    }
  });

  const onEnter = (message: string) => {
    if (message == "") return;
    const pMessage = {message, room: selectedChat, user: user._id, date: new Date()}
    chat.sendMessage(pMessage);
    messages.push(pMessage);
    setMessages([...messages]);
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
        <section className={styles["msger"]}>
          <header className={styles["msger-header"]}>
            <div className={styles["msger-header-title"]}>
              <i className={styles["fas fa-comment-alt"]}></i> 
              {selectedChat.courseNumber}
            </div>
            <div className={styles["msger-header-options"]}>
              <span><i className={styles["fas fa-cog"]}></i></span>
            </div>
          </header>

          <main className={styles["msger-chat"]}>
            {messages.map((message, i) => 
              <div ref={lastMessageRef}>
                <Message leftOrRight={message.user == user._id ? "right-msg" : "left-msg"}
                  user={message.user} message={message.message} time={message.date.toLocaleTimeString()} key={i} />
              </div>
            )}

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
  )
}
