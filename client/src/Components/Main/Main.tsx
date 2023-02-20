import { CalendarWidget } from "../CalendarWidget"
import styles from "./Main.module.scss"
import Course from "../../../../types/Course"
import CourseQuickView from "../CourseQuickViewContainer/CourseQuickViewContainer"

type MainProps = {
  courses: Course[]
}

export default function Main(props: MainProps) {
  return (
    <div className={styles["main-content-container"]}>
      <CalendarWidget />
      <CourseQuickView courses={props.courses} />
    </div>
  )
}
