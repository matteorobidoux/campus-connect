import styles from "./ChosenCourse.module.scss"
import { SelectedCourse } from "../CourseEntryWidget"

type ChosenCourseProps = {
  course: SelectedCourse
}

export default function ChosenCourse(props: ChosenCourseProps) {
  return (
    <div className={styles.container}>
      {
        `${props.course.title} - ${props.course.teacher} - ${props.course.sectionNumber}`
      }
    </div>
  )
}