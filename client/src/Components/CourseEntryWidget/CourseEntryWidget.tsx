import { useState } from "react"
import styles from "./CourseEntryWidget.module.scss"
import ChosenCourse from "./ChosenCourse/ChosenCourse"
import ChosenCourseEntry from "./ChosenCourseEntry/ChosenCourseEntry"

export type SelectedCourse = {
  title: string,
  teacher: string,
  sectionNumber: string
}

export default function CourseEntryWidget() {
  const [selectedCourses, setSelectedCourses] = useState<Array<SelectedCourse>>([])
  const [isAdding, setIsAdding] = useState(false)

  const handleRemoveCourse = (key: number) => {
    console.log("key", key);
    console.log("course", selectedCourses[key]);

    setSelectedCourses(selectedCourses.filter(course => { return course !== selectedCourses[key] }))
  }

  const handleAddCourse = (course: SelectedCourse) => {
    if (selectedCourses.length < 1) {
      setSelectedCourses([...selectedCourses, course])
      return
    }
    console.log(course, selectedCourses, selectedCourses.indexOf(course));

    if (selectedCourses.indexOf(course) === -1) {
      setSelectedCourses([...selectedCourses, course])
    } else {
      // TODO: show error message to the user that they cannot have the same class present twice
      console.log("CHANGE THIS LOG. Error cannot have the same class twice");
    }
  }

  const handleFinishedAddingCourses = () => {
    console.log("Add courses", selectedCourses);
  }

  return (
    <div className={styles["course-entry-widget-container"]}>
      <span className={styles.title}>Choose your courses:</span>
      {
        selectedCourses.map((course, key) => {
          return (
            <ChosenCourse course={course} key={key} courseKey={key} handleRemove={handleRemoveCourse} />
          )
        })
      }
      {
        selectedCourses.length < 8 ?
          <>
            {
              isAdding ?
                <ChosenCourseEntry setIsAdding={setIsAdding} handleAddCourse={handleAddCourse} />
                :
                <button onClick={e => { e.preventDefault(); setIsAdding(true) }}>Add Course</button>
            }
          </>
          : null
      }
      {
        selectedCourses.length < 1 ? null :
          <button onClick={e => {
            e.preventDefault()
            handleFinishedAddingCourses()
          }}>Finish</button>
      }
    </div>
  )
}
