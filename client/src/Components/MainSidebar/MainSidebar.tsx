import { UserClassSection } from "../../../../types/UserClassSection";
import { useSections, useUser } from "../../custom-query-hooks";
import CourseQuickViewContainer from "../CourseQuickViewContainer/CourseQuickViewContainer";
import ChatButton from "../ChatButton/ChatButton";
import styles from "./MainSidebar.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { StaggeredFadeInAnimation } from "../../framerMotionAnimations";

type MainSidebarProps = {
  selectedComponent: string;
  selectChatFunc: (course: UserClassSection | null) => void;
  selectComponentFunc: Function;
};

export default function MainSidebar(props: MainSidebarProps) {
  const user = useUser();
  const delay: number = 0.05;
  const groupChatButtonsAnimation = StaggeredFadeInAnimation(
    0.1,
    0.1,
    delay,
    delay
  );
  const { isLoading, isSuccess, data } = useSections({
    userClassSections: user.sections,
  });

  return (
    <AnimatePresence>
      <motion.div
        className={styles["main-sidebar-container"]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* This is temporary - Marian - 27/02/2023 */}
        <div
          className={[styles["sidebar-section"], styles["classes"]].join(" ")}
        >
          <div className={styles["menu"]}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
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
              onClick={() => {
                props.selectComponentFunc("chat");
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
                {user.sections.map((value, index) => (
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
