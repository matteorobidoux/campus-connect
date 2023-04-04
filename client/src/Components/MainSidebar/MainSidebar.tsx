import { UserClassSection } from "../../../../types/UserClassSection";
import { useSections, useUser } from "../../custom-query-hooks";
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
import { useEffect, useState } from "react";

type MainSidebarProps = {
  selectedComponent: string;
  selectChatFunc: (course: UserClassSection | null) => void;
  selectComponentFunc: Function;
  mostRecentMessage: Map<string, MostRecentMessage>;
  setMostRecentMessageById: (
    id: string,
    setMostRecentMessage: MostRecentMessage
  ) => void;
};

export default function MainSidebar(props: MainSidebarProps) {
  const delay: number = 0.05;
  const groupChatButtonsAnimation = StaggeredFadeInAnimation(
    0.1,
    0.1,
    delay,
    delay
  );
  const user = useUser();
  const { isLoading, isSuccess, data } = useSections({
    userClassSections: user.sections,
  });

  const containerAnimation = FadeInAnimation(0.8);

  // useEffect(() => {debugger}, [props.mostRecentMessage])

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
                if (user.sections.length > 0)
                  props.selectChatFunc(user.sections[0]);
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
                {user.sections.map((value, index) => (
                  <ChatButton
                    data={data}
                    key={index}
                    index={index}
                    mostRecentMessage={props.mostRecentMessage.get(
                      value.courseNumber
                    )}
                    setMostRecentMessage={(m) =>
                      props.setMostRecentMessageById(value.courseNumber, m)
                    }
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
