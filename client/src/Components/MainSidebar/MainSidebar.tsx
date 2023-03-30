import { UserClassSection } from "../../../../types/UserClassSection";
import { useSections } from "../../custom-query-hooks";
import CourseQuickViewContainer from "../CourseQuickViewContainer/CourseQuickViewContainer";
import ChatButton from "../ChatButton/ChatButton";
import styles from "./MainSidebar.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import {
  FadeInAnimation,
  StaggeredFadeInAnimation,
} from "../../framerMotionAnimations";
import { User } from "../../../../types/User";

type MainSidebarProps = {
  selectedComponent: string;
  selectChatFunc: (course: UserClassSection | null) => void;
  selectComponentFunc: Function;
  user: User & {
    _id: string;
  };
};

export default function MainSidebar(props: MainSidebarProps) {
  const delay: number = 0.05;
  const groupChatButtonsAnimation = StaggeredFadeInAnimation(
    0.1,
    0.1,
    delay,
    delay
  );
  const { isLoading, isSuccess, data } = useSections({
    userClassSections: props.user.sections,
  });

  const containerAnimation = FadeInAnimation(0.8);

  return (
    <AnimatePresence>
      <motion.div
        className={styles["main-sidebar-container"]}
        initial="hidden"
        exit="hidden"
        animate="visible"
        variants={containerAnimation}
        layout="position"
      >
        {/* This is temporary - Marian - 27/02/2023 */}
        <div
          className={[styles["sidebar-section"], styles["classes"]].join(" ")}
        >
          <div className={styles["menu"]}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className={
                props.selectedComponent === "calender" ? styles.selected : ""
              }
              onClick={() => {
                props.selectComponentFunc("calender");
                props.selectChatFunc(null);
              }}
            >
              Calender
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className={
                props.selectedComponent === "chat" ? styles.selected : ""
              }
              onClick={() => {
                props.selectComponentFunc("chat");
                // Select first chat by default
                if (props.user.sections.length > 0)
                  props.selectChatFunc(props.user.sections[0]);
              }}
            >
              Chat
            </motion.button>
          </div>
          {props.selectedComponent === "calender" ? (
            isLoading ? (
              <span>Loading...</span>
            ) : isSuccess ? (
              <CourseQuickViewContainer data={data} />
            ) : (
              <span>Couldn't load data</span>
            )
          ) : props.selectedComponent === "chat" ? (
            isLoading ? (
              <span>Loading...</span>
            ) : isSuccess ? (
              <motion.div
                className={styles["groupchats"]}
                variants={groupChatButtonsAnimation}
                initial="hidden"
                animate="visible"
              >
                {props.user.sections.map((value, index) => (
                  <ChatButton
                    data={data}
                    key={index}
                    index={index}
                    onClick={() => props.selectChatFunc(value)}
                  />
                ))}
              </motion.div>
            ) : (
              <span>Couldn't load data</span>
            )
          ) : null}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
