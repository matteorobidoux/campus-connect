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

  const handleAddCourse = (course: string, section: string) => {
    const generatedUUID = uuid()
    console.log(selectedCourses.length === 0, !isCourseSelected(course));
    if (selectedCourses.length === 0 || !isCourseSelected(course)) {
      setSelectedCourses([...selectedCourses, {
        uuid: generatedUUID,
        number: course,
        sectionNumber: section
      }])
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
            <span>Loading...</span>
            :
            isSuccess ?
              <>
                <span className={styles.title}>Choose your courses:</span>
                <div className={styles["entered-courses"]}>
                  {
                    selectedCourses.map((course, key) =>
                      <CoursePicker
                        key={key}
                        pickedCourse={course}
                        disabled={course.uuid !== editedCoursePickerUUID}
                        courses={data.response.filter((_course: StrippedCourse) =>
                          _course.number === course.number || !isCourseSelected(_course.number)
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
                        onRemove={() => handleRemoveCourse(key)
                        }
                      />
                    )
                  }
                </div>
                {
                  selectedCourses.length < maxAmountOfCourses ?
                    <CoursePicker
                      disabled={false}
                      courses={data.response.filter((course: StrippedCourse) =>
                        !isCourseSelected(course.number)
                      )}
                      onAdd={handleAddCourse}
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
