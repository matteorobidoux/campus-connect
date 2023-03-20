import { useState } from "react"
import styles from "./CourseEntryWidget.module.scss"
import CoursePicker from "./CoursePicker/CoursePicker"
import { v4 as uuid } from "uuid"
import { StrippedCourse } from "../../../../types/Course"
import { useAddUserMutation, useCourseInfo } from "../../custom-query-hooks"
import { useGoogleOAuth } from "../../custom-query-hooks/useGoogleOAuth"
import { RegisterInfo } from "../../../../types/Queries/GAuth"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"

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
  const googleDataQuery = useGoogleOAuth();
  const createUserMutation = useAddUserMutation();

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

  const handleFinishedAddingCourses = async () => {
    // TODO: connect with API
    console.log("Add courses", selectedCourses);
    const data: RegisterInfo = googleDataQuery.data;
    createUserMutation.mutateAsync({
      email: data.email,
      gid: data.gid,
      picture: data.picture,
      googleTokens: { access_token: data.access_token, refresh_token: data.refresh_token },
      name: "placeholder",
      sections: selectedCourses.map(c => ({ courseNumber: c.number, sectionNumber: c.sectionNumber })),
    });
  }

  const isCourseSelected = (course: string) =>
    selectedCourses.find(sCourse => sCourse.number === course) !== undefined

  return (
    <LayoutGroup>
      <div className={styles["course-entry-widget-container"]}>
        <>
          {
            isLoading ?
              <span>Loading...</span>
              :
              isSuccess ?
                <>
                  <motion.span className={styles.title}>Choose your courses:</motion.span>
                  <div className={styles["entered-courses"]}>
                    <LayoutGroup>
                      <AnimatePresence>
                        {
                          selectedCourses.map((course, key) =>
                            <CoursePicker
                              key={course.uuid}
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
                      </AnimatePresence>
                    </LayoutGroup>
                  </div>
                  <motion.div
                    className={[styles["course-entry-widget-container"], styles["bottom-options"]].join(" ")}
                    layout="preserve-aspect">
                    {
                      selectedCourses.length < maxAmountOfCourses &&
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
                    }
                    {
                      selectedCourses.length > 0 &&
                      <button
                        onClick={e => {
                          e.preventDefault()
                          handleFinishedAddingCourses()
                        }}>
                        Finish
                      </button>
                    }
                  </motion.div>
                </>
                :
                <span>Couldn't load data</span>
          }
        </>
      </div>
    </LayoutGroup>
  )
}
