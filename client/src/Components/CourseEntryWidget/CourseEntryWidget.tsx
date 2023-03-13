import { useState } from "react"
import styles from "./CourseEntryWidget.module.scss"
import ChosenCourse from "./ChosenCourse/ChosenCourse"
import ChosenCourseEntry from "./ChosenCourseEntry/ChosenCourseEntry"
import { useAddUserMutation, useCourseInfo } from "../../custom-query-hooks"
import { useGoogleOAuth } from "../../custom-query-hooks/useGoogleOAuth"
import { RegisterInfo } from "../../../../types/Queries/GAuth"

export type SelectedCourse = {
  title: string,
  number: string,
  teacher: string,
  sectionNumber: string
}

export default function CourseEntryWidget() {
  const [selectedCourses, setSelectedCourses] = useState<Array<SelectedCourse>>([])
  const [isAdding, setIsAdding] = useState(false)
  const [isCourseAlreadyAdded, setIsCourseAlreadyAdded] = useState(false)
  const maxAmountOfCourses = 14

  const { isLoading, isSuccess, data } = useCourseInfo()
  const googleDataQuery = useGoogleOAuth();
  const createUserMutation = useAddUserMutation();

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
      if (isCourseAlreadyAdded) setIsCourseAlreadyAdded(false)
    } else {
      setIsCourseAlreadyAdded(true)
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
      googleTokens: {access_token: data.access_token, refresh_token: data.refresh_token},
      name: "placeholder",
      sections: selectedCourses.map(c => ({courseNumber: c.number, sectionNumber: c.sectionNumber})),
    });
  }

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
                    selectedCourses.map((course, key) => {
                      return (
                        <ChosenCourse course={course} key={key} courseKey={key} handleRemove={handleRemoveCourse} />
                      )
                    })
                  }
                </div>
                {
                  selectedCourses.length < maxAmountOfCourses ?
                    <>
                      {
                        isAdding ?
                          <ChosenCourseEntry setIsAdding={setIsAdding} handleAddCourse={handleAddCourse} courses={data.response} selectedCourses={selectedCourses} />
                          :
                          <button className={styles["add-course"]} onClick={e => { e.preventDefault(); setIsAdding(true) }}>Add Course</button>
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
              </>
              :
              <span>Couldn't load data</span>
        }
      </>
    </div>
  )
}
