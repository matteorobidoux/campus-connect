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
      {
        `${props.course.title} - ${props.course.teacher} - ${props.course.sectionNumber}`
      }
      <button onClick={e => {
        e.preventDefault();
        props.handleRemove(props.courseKey)
      }}>Remove</button>
    </div>
  )
}