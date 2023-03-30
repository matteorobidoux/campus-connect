import { MostRecentMessage } from "../../../../types/Queries/MostRecentMessage";
import { UserClassSection } from "../../../../types/UserClassSection";
import { CalendarWidget } from "../CalendarWidget";
import { AnimatePresence, motion } from "framer-motion";
import Chat from "../Chat/Chat";
import styles from "./Main.module.scss";

type MainProps = {
  selectedComponent: string;
  selectedChat: UserClassSection | null;
  setMostRecentMessage: (setMostRecentMessage: MostRecentMessage) => void;
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
          <Chat selectedChat={props.selectedChat} setMostRecentMessage={props.setMostRecentMessage}/>
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
}
