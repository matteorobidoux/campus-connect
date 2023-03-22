import { GetAllSectionsResponse } from "../../../../types/Queries/GetAllCourses"
import { useState } from "react"
import styles from "./ChatButton.module.scss"

type ChatButtonProps = {
  data: GetAllSectionsResponse,
  index: any,
  onClick: any
}

export default function ChatButton(props: ChatButtonProps) {
  const [animateBubble, setAnimateBubble] = useState(false)
  const animationDuration: number = 2000
  return (
    <>
      <div className={styles["button-container"]} onClick={props.onClick}>
        <div className={styles["button"]}>
          <h2>{props.data[props.index].courseTitle}</h2>
          <h4>Last message placeholder</h4>
          <div className={animateBubble ? [styles.bubble, styles.animationBubble].join(" ") : styles.bubble} style={{ background: `lightgreen`, animationDuration: `${animationDuration / 1000}s` }}></div>
        </div>
      </div>
    </>
  )
}
