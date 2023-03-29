import { GetAllSectionsResponse } from "../../../../types/Queries/GetAllCourses";
import { MostRecentMessage } from "../../../../types/Queries/MostRecentMessage";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FadeInAnimation } from "../../framerMotionAnimations";
import styles from "./ChatButton.module.scss";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

type ChatButtonProps = {
  data: GetAllSectionsResponse;
  index: any;
  onClick: any;
  mostRecentMessage: MostRecentMessage;
  setMostRecentMessage: (setMostRecentMessage: MostRecentMessage) => void;
};

export default function ChatButton(props: ChatButtonProps) {
  const animation = FadeInAnimation(0.15);
  let [message, setMessage] = useState(props.mostRecentMessage);
  const { t } = useTranslation(["chat"]);

  useEffect(() => {
    const getMostRecentMessage = async () =>
      axios.get("/api/getMostRecentMessage", {
        params: {
          courseNumber: props.data[props.index].courseNumber,
          sectionNumber: props.data[props.index].number,
        },
      });

    getMostRecentMessage()
      .then((res) => {
        if (res.data) {
          setMessage(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (
      props.mostRecentMessage.room?.courseNumber ===
        props.data[props.index].courseNumber &&
      props.mostRecentMessage.room?.sectionNumber ===
        props.data[props.index].number
    ) {
      setMessage(props.mostRecentMessage);
    }
  }, [props.mostRecentMessage]);

  return (
    <motion.div
      className={styles["button-container"]}
      onClick={props.onClick}
      variants={animation}
    >
      <div className={styles["button"]}>
        <h2>{props.data[props.index].courseTitle}</h2>
        <h4>
          {message.username === null
            ? t("Loading")
            : message.username === ""
            ? t("NoMessagesYet")
            : `${message.username}: ${message.message}`}
        </h4>
        <div className={styles.bubble}></div>
      </div>
    </motion.div>
  );
}
