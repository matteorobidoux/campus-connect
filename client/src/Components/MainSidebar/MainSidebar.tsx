import { useSections, useUser } from "../../custom-query-hooks"
import CourseQuickViewContainer from "../CourseQuickViewContainer/CourseQuickViewContainer"
import styles from "./MainSidebar.module.scss"

export default function MainSidebar() {
  const user = useUser();

  const { isLoading, isSuccess, data } = useSections({userClassSections: user.sections});
  const onSubmit = () => {
    //
    // addUser.mutate({
    //
    // })

    // addUser.mutate({
    //   sections: [{ courseNumber: "530-292-DW", sectionNumber: "00001" }],
    // })
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
