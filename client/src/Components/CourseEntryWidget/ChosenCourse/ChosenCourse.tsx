import styles from "./ChosenCourse.module.scss"
import { SelectedCourse } from "../CourseEntryWidget"

type ChosenCourseProps = {
  course: SelectedCourse,
  courseKey: number,
  handleRemove: (key: number) => void
}

export default function ChosenCourse(props: ChosenCourseProps) {
  return (
    <div className={styles.container}>
      <div className={styles["info-container"]}>
        <span>{props.course.title}</span>
        <hr />
        <span>{props.course.teacher}</span>
        <hr />
        <span>{props.course.sectionNumber}</span>
      </div>
      <button onClick={e => {
        e.preventDefault();
        props.handleRemove(props.courseKey)
      }}>Remove</button>
    </div>
  )
}