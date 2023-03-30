import { UserClassSection } from "../../../../types/UserClassSection";
import { useSections } from "../../custom-query-hooks";
import CourseQuickViewContainer from "../CourseQuickViewContainer/CourseQuickViewContainer";
import ChatButton from "../ChatButton/ChatButton";
import styles from "./MainSidebar.module.scss";
import { MostRecentMessage } from "../../../../types/Queries/MostRecentMessage";
import { AnimatePresence, motion } from "framer-motion";
import {
  FadeInAnimation,
  StaggeredFadeInAnimation,
} from "../../framerMotionAnimations";
import { User } from "../../../../types/User";
import { useTranslation } from "react-i18next";

type MainSidebarProps = {
  selectedComponent: string;
  selectChatFunc: (course: UserClassSection | null) => void;
  selectComponentFunc: Function;
  mostRecentMessage: MostRecentMessage;
  setMostRecentMessage: (setMostRecentMessage: MostRecentMessage) => void;
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

  const { t } = useTranslation(["chat"]);

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
              {t("Calendar")}
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
              {t("Chat")}
            </motion.button>
          </div>
          {props.selectedComponent === "calender" ? (
            isLoading ? (
              <span>{t("Loading")}</span>
            ) : isSuccess ? (
              <CourseQuickViewContainer data={data} />
            ) : (
              <span>{t("CouldntLoadData")}</span>
            )
          ) : props.selectedComponent === "chat" ? (
            isLoading ? (
              <span>{t("Loading")}</span>
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
                    mostRecentMessage={props.mostRecentMessage}
                    setMostRecentMessage={props.setMostRecentMessage}
                    onClick={() => props.selectChatFunc(value)}
                  />
                ))}
              </motion.div>
            ) : (
              <span>{t("CouldntLoadData")}</span>
            )
          ) : null}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
