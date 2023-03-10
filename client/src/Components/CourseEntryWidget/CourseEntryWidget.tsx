import { useState } from "react"
import styles from "./CourseEntryWidget.module.scss"
import { useCourseInfo } from "../../custom-query-hooks"
import CoursePicker from "./CoursePicker/CoursePicker"
import { v4 as uuid } from "uuid"
import { StrippedCourse } from "../../../../types/Course"

export type SelectedCourse = {
  uuid: string
  number: string
  sectionNumber: string
}

export default function CourseEntryWidget() {
  const [selectedCourses, setSelectedCourses] = useState<Array<SelectedCourse>>([])
  const [editedCoursePickerUUID, setEditedCoursePickerUUID] = useState<string | null>(null)
  const maxAmountOfCourses = 14

  const { isLoading, isSuccess, data } = useCourseInfo()

  const handleRemoveCourse = (key: number) => {
    setSelectedCourses(selectedCourses.filter(course => { return course !== selectedCourses[key] }))
  }

  const handleAddCourse = (course: SelectedCourse) => {
    if (selectedCourses.length < 1) {
      setSelectedCourses([...selectedCourses, course])
      return
    }
    if (selectedCourses.indexOf(course) === -1) {
      setSelectedCourses([...selectedCourses, course])
    }
  }

  const handleFinishedAddingCourses = () => {
    // TODO: connect with API
    console.log("Add courses", selectedCourses);
  }

  const isCourseSelected = (course: string) =>
    selectedCourses.find(sCourse => sCourse.number === course) !== undefined

  return (
    <div className={styles["course-entry-widget-container"]}>
      <>
        {
          isLoading ?
            <span>Loading..</span>
            :
            isSuccess ?
              <>
                <span className={styles.title}>Choose your courses:</span>
                <div className={styles["entered-courses"]}>
                  {
                    selectedCourses.map((course, key) =>
                      <CoursePicker
                        pickedCourse={course.number}
                        pickedSection={course.sectionNumber}
                        disabled={course.uuid !== editedCoursePickerUUID}
                        courses={data.response.filter((_course: StrippedCourse) =>
                          !isCourseSelected(_course.number)
                        )}
                        onEditingChange={(state: boolean) => {
                          if (state) {
                            setEditedCoursePickerUUID(course.uuid)
                          } else {
                            setEditedCoursePickerUUID(null)
                          }
                        }}
                        onAdd={() => { }}
                        onEditSave={(course: string, section: string) => {
                          selectedCourses[key].number = course
                          selectedCourses[key].sectionNumber = section
                          setSelectedCourses(selectedCourses)
                        }}
                        onRemove={() => {
                          selectedCourses.splice(key, 1)
                          setSelectedCourses(selectedCourses)
                        }}
                      />
                    )
                  }
                </div>
                {
                  selectedCourses.length < maxAmountOfCourses ?
                    <CoursePicker
                      pickedCourse=""
                      pickedSection=""
                      disabled={false}
                      courses={data.response.filter((course: StrippedCourse) =>
                        !isCourseSelected(course.number)
                      )}
                      onAdd={(course: string, section: string) => {
                        const generatedUUID = uuid()
                        if (!isCourseSelected(course)) {
                          setSelectedCourses([...selectedCourses, {
                            uuid: generatedUUID,
                            number: course,
                            sectionNumber: section
                          }])
                        }
                      }}
                      onEditSave={() => { }}
                      onRemove={() => { }}
                      onEditingChange={() => { }}
                    />
                    : null
                }
                {
                  selectedCourses.length < 1 ? null :
                    <button onClick={e => {
                      e.preventDefault()
                      handleFinishedAddingCourses()
                    }}>Finish</button>
                }
              </>
              :
              <span>Couldn't load data</span>
        }
      </>
    </div>
  )
}
