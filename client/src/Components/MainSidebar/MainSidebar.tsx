import { useSections, useUser } from "../../custom-query-hooks"
import CourseQuickViewContainer from "../CourseQuickViewContainer/CourseQuickViewContainer"
import styles from "./MainSidebar.module.scss"

type MainSidebarProps = {
  selectComponentFunc : Function
}

export default function MainSidebar(props: MainSidebarProps) {
  const user = useUser();

  const { isLoading, isSuccess, data } = useSections({userClassSections: user.sections});

  return (
    <>
      <div className={styles["main-sidebar-container"]}>
        {/* This is temporary - Marian - 27/02/2023 */}
        <div className={[styles["sidebar-section"], styles["classes"]].join(" ")}>
          <div className={styles["menu"]}>
            <button onClick={() => {
              props.selectComponentFunc("calender");
              }}>Calender</button>
            <button onClick={() => {
              props.selectComponentFunc("chat");
              }}>Chat</button>
            <button>Marketplace</button>
          </div>
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
