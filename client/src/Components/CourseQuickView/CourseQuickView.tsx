import { useState } from "react"
import { ColoredCourse } from "../../../../types/Course"
import styles from "./CourseQuickView.module.scss"

type CourseQuickViewProps = ColoredCourse & {
  key: number
}

export default function CourseQuickView(props: CourseQuickViewProps) {
  const [animateBubble, setAnimateBubble] = useState(false)
  const animationDuration: number = 2000
  return (
    <>
      <div className={styles["course-quick-view"]} onClick={e => {
        e.preventDefault()
        setAnimateBubble(true)
        setTimeout(() => { setAnimateBubble(false) }, animationDuration); //need to change this
      }}>
        <h2>{props.title.length >= 25 ? props.title.split(/[.,:]/gm)[0] : props.title}</h2>
        <h4>{props.sections[0]?.teacher || "TBA"}</h4>
        <div className={animateBubble ? [styles.bubble, styles.animationBubble].join(" ") : styles.bubble} style={{ background: `var(--classes-${props.color})`, animationDuration: `${animationDuration / 1000}s` }}></div>
      </div>
    </>
  )
}
