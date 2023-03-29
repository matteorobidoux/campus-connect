import { UserClassSection } from "../../../../types/UserClassSection";
import { CalendarWidget } from "../CalendarWidget";
import { AnimatePresence, motion } from "framer-motion";
import Chat from "../Chat/Chat";
import styles from "./Main.module.scss";

type MainProps = {
  selectedComponent: string;
  selectedChat: UserClassSection | null;
};

export default function Main(props: MainProps) {
  return (
    <AnimatePresence>
      <motion.div
        className={styles["main-content-container"]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, delay: 0.35 }}
        layout="position"
      >
        {!props.selectedChat ? (
          <CalendarWidget />
        ) : props.selectedComponent === "chat" ? (
          <Chat key={props.selectedChat.sectionNumber + props.selectedChat.courseNumber} selectedChat={props.selectedChat} />
          ) : null}
      </motion.div>
    </AnimatePresence>
  );
}
