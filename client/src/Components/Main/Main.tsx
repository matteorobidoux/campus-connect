import { MostRecentMessage } from "../../../../types/Queries/MostRecentMessage";
import { UserClassSection } from "../../../../types/UserClassSection";
import { CalendarWidget } from "../CalendarWidget";
import { AnimatePresence, motion } from "framer-motion";
import Chat from "../Chat/Chat";
import styles from "./Main.module.scss";
import { useSections, useUser } from "../../custom-query-hooks";
import { useEffect, useState } from "react";
import { ChatMessage, useChat } from "../../chat";

type MainProps = {
  selectedComponent: string;
  selectedChat: UserClassSection | null;
  setMostRecentMessageById: (
    id: string,
    setMostRecentMessage: MostRecentMessage
  ) => void;
};

export default function Main(props: MainProps) {
  const user = useUser();
  const sections = useSections({ userClassSections: user.sections });
  const [states, setStates] = useState<Map<string, ChatMessage[]>>(new Map());

  useEffect(() => {
    if (sections.isSuccess) {
      const map = new Map();
      for (let i = 0; i < sections.data!.length; i++) {
        map.set(sections.data?.at(i)?.courseNumber, []);
      }
      setStates(map);
    }
  }, [sections.data, sections.isSuccess]);

  function setMessages(
    selectedChat: UserClassSection,
    before: boolean,
    ...messages: ChatMessage[]
  ) {
    setStates((prevState) =>
      mutateMap(prevState, selectedChat, before, ...messages)
    );
  }

  function mutateMap(
    map: Map<string, ChatMessage[]>,
    selectedChat: UserClassSection,
    before: boolean,
    ...messages: ChatMessage[]
  ) {
    let arr = map.get(selectedChat.courseNumber)!;
    console.log(states);

    props.setMostRecentMessageById(selectedChat.courseNumber, {
      message: messages[messages.length - 1].message,
      userName: messages[messages.length - 1].user.userName,
      room: selectedChat,
    } as MostRecentMessage);

    if (before) {
      arr = [...messages, ...arr];
    } else {
      arr = [...arr, ...messages];
    }

    map.set(selectedChat.courseNumber, arr);
    return new Map(map);
  }

  const chat = useChat({
    rooms: user.sections,
    onMessage: (m) => {
      // debugger;
      setStates((prevState) => mutateMap(prevState, m.room, false, m));
    },
  });

  const useMessages = (id: string) => {
    let [messages, setMessages] = useState<ChatMessage[]>(states.get(id)!);
    useEffect(() => {
      setMessages(states.get(id)!);
    }, [states]);

    return messages;
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles["main-content-container"]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, delay: 0.35 }}
        layout="position"
      >
        {props.selectedComponent === "chat" ? (
          sections.data?.map((s, i) => {
            const currentChat = {
              courseNumber: s.courseNumber,
              sectionNumber: s.number,
            };
            if (currentChat.courseNumber != props.selectedChat?.courseNumber)
              return;
            return (
              <Chat
                selectedChat={currentChat}
                key={i}
                _setMessages={(before, ...chatMessages) =>
                  setMessages(
                    { courseNumber: s.courseNumber, sectionNumber: s.number },
                    before,
                    ...chatMessages
                  )
                }
                useMessages={useMessages}
                sendMessage={chat.sendMessage}
              />
            );
          })
        ) : (
          <CalendarWidget />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
