import { useSections, useUser } from "../../custom-query-hooks"
import CourseQuickViewContainer from "../CourseQuickViewContainer/CourseQuickViewContainer"
import styles from "./MainSidebar.module.scss"

export default function MainSidebar() {
  const user = useUser();

  const { isLoading, isSuccess, data } = useSections({userClassSections: user.sections});

  return (
    <>
      <div className={styles["main-sidebar-container"]}>
        {/* This is temporary - Marian - 27/02/2023 */}
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
