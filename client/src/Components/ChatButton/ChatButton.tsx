import { GetAllSectionsResponse } from "../../../../types/Queries/GetAllCourses";
import { MostRecentMessage } from "../../../../types/Queries/MostRecentMessage";
import { useEffect, useState } from "react";
import styles from "./ChatButton.module.scss";
import axios from "axios";

type ChatButtonProps = {
  data: GetAllSectionsResponse;
  index: any;
  onClick: any;
  mostRecentMessage: MostRecentMessage;
  setMostRecentMessage: (setMostRecentMessage: MostRecentMessage) => void;
};

export default function ChatButton(props: ChatButtonProps) {
  const [animateBubble, setAnimateBubble] = useState(false);
  const animationDuration: number = 2000;

  useEffect(() => {
    console.log("Data", props.data, props.index)
    console.log("In Fetch", props.data[props.index].courseNumber, props.data[props.index].number)
    const getMostRecentMessage = async () => axios.get(
      "/api/getMostRecentMessage", {params: {courseNumber: props.data[props.index].courseNumber, sectionNumber: props.data[props.index].number}}
    );

    getMostRecentMessage().then((res) => {
      if (res.data) {
        props.setMostRecentMessage(res.data)
      }
    }).catch((err) => {
      console.log(err)
    })
  }, [])
  return (
    <>
      <div className={styles["button-container"]} onClick={props.onClick}>
        <div className={styles["button"]}>
          <h2>{props.data[props.index].courseTitle}</h2>
          <h4 className={styles["recent-message"]}>
            {props.mostRecentMessage.username === null ? "Loading..." : props.mostRecentMessage.username === "" ? "No messages yet" : `${props.mostRecentMessage.username}: ${props.mostRecentMessage.message}`}
          </h4>
          <div
            className={
              animateBubble
                ? [styles.bubble, styles.animationBubble].join(" ")
                : styles.bubble
            }
            style={{
              background: `lightgreen`,
              animationDuration: `${animationDuration / 1000}s`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
}
