import { SelectedCourse } from "../CourseEntryWidget"
import styles from "./ChosenCourseEntry.module.scss"

type ChosenCourseEntryProps = {
  setIsAdding: (state: boolean) => void,
  handleAddCourse: (course: SelectedCourse) => void
}

export default function ChosenCourseEntry(props: ChosenCourseEntryProps) {
  return (
    <div className={styles["entry-container"]}>
      <p>Select course</p>
      <p>Select section</p>
      <button onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        props.setIsAdding(false)
        let random = Math.round(Math.random() * 100)
        props.handleAddCourse({
          title: "Web dev I",
          teacher: "Dirk Dubois",
          sectionNumber: "0000" + random
        })
      }}>Add</button>
    </div>
  )
}