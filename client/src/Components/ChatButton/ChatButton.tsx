import { GetAllSectionsResponse } from "../../../../types/Queries/GetAllCourses";
import { MostRecentMessage } from "../../../../types/Queries/MostRecentMessage";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FadeInAnimation } from "../../framerMotionAnimations";
import styles from "./ChatButton.module.scss";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

type ChatButtonProps = {
  data: GetAllSectionsResponse;
  index: any;
  onClick: any;
  mostRecentMessage?: MostRecentMessage;
  setMostRecentMessage: (setMostRecentMessage: MostRecentMessage) => void;
};

export default function ChatButton(props: ChatButtonProps) {
  const animation = FadeInAnimation(0.15);
  let [message, setMessage] = useState(props.mostRecentMessage);
  const { t } = useTranslation(["chat"]);

  const getMostRecentMessage = async () =>
    axios.get("/api/getMostRecentMessage", {
      params: {
        courseNumber: props.data[props.index].courseNumber,
        sectionNumber: props.data[props.index].number,
      },
    });

  let query = useQuery({
    queryKey: [
      "recentMessage",
      props.data[props.index].courseNumber,
      props.data[props.index].number,
    ],
    queryFn: getMostRecentMessage,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (props.mostRecentMessage) {
      setMessage(props.mostRecentMessage);
      return;
    }

    if (query.data && !message) {
      setMessage(query.data.data);
    }
  }, [query.data, props.mostRecentMessage]);

  return (
    <motion.div
      className={styles["button-container"]}
      onClick={props.onClick}
      variants={animation}
    >
      <div className={styles["button"]}>
        <h2>{props.data[props.index].courseTitle}</h2>
        <h4>
          {!message
            ? t("Loading")
            : message.userName === undefined
            ? t("NoMessagesYet")
            : `${message.userName}: ${message.message}`}
        </h4>
        <div className={styles.bubble}></div>
      </div>
    </motion.div>
  );
}
