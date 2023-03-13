import { useState } from "react"
import { StrippedCourse } from "../../../../../types/Course"
import { SelectedCourse } from "../CourseEntryWidget"
import styles from "./ChosenCourseEntry.module.scss"

type ChosenCourseEntryProps = {
  setIsAdding: (state: boolean) => void,
  handleAddCourse: (course: SelectedCourse) => void,
  selectedCourses: SelectedCourse[],
  courses: StrippedCourse[]
}

export default function ChosenCourseEntry(props: ChosenCourseEntryProps) {
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [isCourseSelected, setIsCourseSelected] = useState<boolean>(false)

  if (props.courses.length < 1) return <span>No courses to selected from</span>

  const handleSubmit = (target: any) => {
    const courseNumber = target.elements.courses.value
    const sectionNumber = target.elements.sections.value

    // Validation
    if (props.selectedCourses.find(course => course.number === courseNumber)) {
      setIsCourseSelected(true)
      return
    }

    const foundCourse = props.courses.find(course => course.number === courseNumber)

    if (foundCourse === undefined) return

    props.handleAddCourse({
      title: foundCourse.title || "No title",
      teacher: foundCourse.sections.find(section => section.number === sectionNumber)?.teacher || "TBA",
      number: courseNumber,
      sectionNumber: sectionNumber
    })
    props.setIsAdding(false)
    if (isCourseSelected)
      setIsCourseSelected(false)
  }

  return (
    <div className={styles["entry-container"]}>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(e.currentTarget)
      }}>
        <label htmlFor="courses">Choose a course:</label>
        <select id="courses" defaultValue={props.courses[0].number} name="courses" onChange={e => {
          e.preventDefault()
          setSelectedCourse(e.target.value)
        }}>
          {
            props.courses.map((course, key) =>
              <option value={course.number} key={key} > {course.number} - {course.title}</option>
            )
          }
        </select>
        <label htmlFor="sections">Choose a section:</label>
        <select id="sections" defaultValue={props.courses[0].sections[0].number} name="sections" onChange={e => {
          e.preventDefault()
        }}>
          {
            props.courses
              .filter(course => course.number === selectedCourse)
              .map((course, key) =>
                course.sections.map((section, sKey) =>
                  <option value={section.number} key={sKey}>{section.teacher} - {section.number}</option>
                )
              )
          }
        </select>
        <button type="submit" onClick={(e) => {
          e.stopPropagation()
        }}>Add</button>
      </form>
      {
        isCourseSelected ?
          <span>Course is already selected. Cannot take the same class twice in the same semester</span>
          :
          null
      }
    </div>
  )
}