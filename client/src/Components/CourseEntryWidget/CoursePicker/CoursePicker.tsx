import { StrippedCourse } from "../../../../../types/Course"
import styles from "./CoursePicker.module.scss"
import { useState, useRef, MutableRefObject, FormEvent } from "react"


type CoursePickerProps = {
  pickedCourse: string
  pickedSection: string
  courses: StrippedCourse[]
  disabled: boolean
  onEditingChange: (state: boolean) => void
  onAdd: (course: string, section: string) => void
  onEditSave: (course: string, section: string) => void
  onRemove: () => void
}

type FormSubmitEvent = FormEvent<HTMLFormElement> & {
  target: & {
    elements: {
      "courses-main": {
        value: any
      }
      "sections-main": {
        value: any
      }
    }
  }
}

export default function CoursePicker(props: CoursePickerProps) {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [currentlySelectedCourse, setCurrentlySelectedCourse] = useState<string>("")
  const sectionsInputEl: MutableRefObject<HTMLInputElement | null> = useRef(null)

  if (props.courses.length < 1) return <span>No courses to pick from </span>

  if (!props.pickedCourse && !props.pickedSection) {
    return (
      <>
        {
          // Show form if you are adding
          isAdding ?
            <form onSubmit={(e: FormSubmitEvent) => {
              e.preventDefault()
              e.stopPropagation()
              const course = e.target.elements["courses-main"].value
              const section = e.target.elements["sections-main"].value
              console.log("submit");
              console.log(course, section);
              setIsAdding(false)
            }}>
              <div className={styles.inputs}>
                <input list="courses-main" id="course-choice" placeholder="Choose a course"
                  autoComplete="off"
                  onInput={e => {
                    e.preventDefault()
                    setCurrentlySelectedCourse(e.currentTarget.value)
                    sectionsInputEl!.current!.value = ""
                  }}
                />
                <datalist id="courses-main">
                  {
                    props.courses.map((course, key) =>
                      <option key={key} value={course.number}>{course.number} - {course.title}</option>
                    )
                  }
                </datalist>
              </div>

              <div className={styles.inputs}>
                <input list="sections-main" id="section-choice" placeholder="Choose a section"
                  ref={sectionsInputEl}
                  autoComplete="off"
                  onInput={e => {
                    e.preventDefault()
                    console.log("input sections");                    
                    e.currentTarget.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
                  }}
                />
                <datalist id="sections-main">
                  {
                    props.courses
                      .filter(course => course.number === currentlySelectedCourse)
                      .map((course) =>
                        course.sections.map((section, key) =>
                          <option key={key} value={section.number}>{section.number} - {section.teacher}</option>
                        )
                      )
                  }
                </datalist>
              </div>
            </form>
            :
            // Show Add Course button before being able to add
            <button type="button" onClick={e => { e.preventDefault(); setIsAdding(true) }}>Add Course</button>
        }
      </>
    )
  } else {
    return (
      <p> picked</p>
    )
  }
}
