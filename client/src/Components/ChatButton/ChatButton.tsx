import { GetAllSectionsResponse } from "../../../../types/Queries/GetAllCourses";
import { MostRecentMessage } from "../../../../types/Queries/MostRecentMessage";
import { useEffect } from "react";
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

  const { t } = useTranslation(["chat"]);

  useEffect(() => {
    console.log("Data", props.data, props.index);
    console.log(
      "In Fetch",
      props.data[props.index].courseNumber,
      props.data[props.index].number
    );
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
          props.setMostRecentMessage(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <motion.div
      className={styles["button-container"]}
      onClick={props.onClick}
      variants={animation}
    >
      <div className={styles["button"]}>
        <h2>{props.data[props.index].courseTitle}</h2>
        <h4>
          {props.mostRecentMessage.username === null
            ? t("Loading")
            : props.mostRecentMessage.username === ""
            ? t("NoMessagesYet")
            : `${props.mostRecentMessage.username}: ${props.mostRecentMessage.message}`}
        </h4>
        <div className={styles.bubble}></div>
      </div>
    </motion.div>
  );
}
