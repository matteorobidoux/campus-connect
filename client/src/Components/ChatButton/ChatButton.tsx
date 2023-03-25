import { GetAllSectionsResponse } from "../../../../types/Queries/GetAllCourses";
import { useEffect, useState } from "react";
import styles from "./ChatButton.module.scss";
import axios from "axios";

type ChatButtonProps = {
  data: GetAllSectionsResponse;
  index: any;
  onClick: any;
};

export default function ChatButton(props: ChatButtonProps) {
  const [animateBubble, setAnimateBubble] = useState(false);
  const animationDuration: number = 2000;
  const [mostRecentMessage, setMostRecentMessage] = useState({message: "", username: null})

  useEffect(() => {
    console.log(props.data[props.index])
    const getMostRecentMessage = async () => axios.get(
      "/api/getMostRecentMessage", {params: {courseNumber: props.data[props.index].courseNumber, sectionNumber: props.data[props.index].number}}
    );

    getMostRecentMessage().then((res) => {
      if (res.data) {
        console.log(res.data.message)
        setMostRecentMessage(res.data)
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
            {mostRecentMessage.username === null ? "Loading..." : mostRecentMessage.username === "" ? "No messages yet" : `${mostRecentMessage.username}: ${mostRecentMessage.message}`}
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
