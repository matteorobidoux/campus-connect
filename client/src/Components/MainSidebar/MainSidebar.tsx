import { useEffect } from "react"
import { colorVariables } from "../../cssUtils"
import { useAddUserMutation, useGetAllSections } from "../../custom-query-hooks"
import CourseQuickViewContainer from "../CourseQuickViewContainer/CourseQuickViewContainer"
import styles from "./MainSidebar.module.scss"

export default function MainSidebar() {

  const fetchedCourses = {
    userClassSections: [
      {
        courseNumber: "203-912-DW",
        sectionNumber: "00001"
      },
      {
        courseNumber: "203-912-DW",
        sectionNumber: "00001"
      },
    ]
  }

  const { isLoading, isSuccess, data } = useGetAllSections(fetchedCourses)

  const defaultColor = "salmon"
  let colors = [{ value: defaultColor }]

  const addUser = useAddUserMutation();

  const onSubmit = () => {

    addUser.mutate({
      sections: [{ courseNumber: "530-292-DW", sectionNumber: "00001" }],
      name: "testUser",
      password: "testPasswd",
    })

  }

  return (
    <>
      <div className={styles["main-sidebar-container"]}>
        {/* This is temporary - Marian - 27/02/2023 */}
        <button onClick={() => onSubmit()}> Create testUser </button>
        <div className={[styles["sidebar-section"], styles["classes"]].join(" ")}>
          {
            isLoading ? <span>Loading...</span> :
              isSuccess ? <CourseQuickViewContainer data={data} /> :
                <span>Couldn't load data</span>
          }
        </div>
      </div>
    </>
  )
}
