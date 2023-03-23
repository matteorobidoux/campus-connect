import { useState } from "react"
import Rodal from "rodal"
import { UserClass } from "../../../../types/UserClass"
import { CourseDetailedViewModal } from "../CourseDetailedViewModal"
import styles from "./CourseQuickView.module.scss"

type CourseQuickViewProps = {
  course: UserClass
  key: number
}

export default function CourseQuickView(props: CourseQuickViewProps) {
  const [animateBubble, setAnimateBubble] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const animationDuration: number = 2000
  return (
    <>
      <Rodal visible={isVisible} onClose={() => setIsVisible(false)} height={500} width={600} customStyles={{
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        boxShadow: "none"
      }}>
        <CourseDetailedViewModal userClass={props.course} close={() => setIsVisible(false)} />
      </Rodal>
      <div className={styles["course-quick-view"]} onClick={e => {
        e.preventDefault()
        setAnimateBubble(true);
        setIsVisible(true);
        setTimeout(() => { setAnimateBubble(false) }, animationDuration); //need to change this
      }}>
        <h2>{props.course.courseTitle}</h2>
        {/* Keep TBA but pririotize passed section teacher prop */}
        <h4>{props.course.teacher || "TBA"}</h4>
        <div className={animateBubble ? [styles.bubble, styles.animationBubble].join(" ") : styles.bubble} style={{ background: `var(--classes-salmon)`, animationDuration: `${animationDuration / 1000}s` }}></div>
      </div>
    </>
  )
}
