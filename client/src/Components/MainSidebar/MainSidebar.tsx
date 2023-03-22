import { UserClassSection } from "../../../../types/UserClassSection"
import { useSections, useUser } from "../../custom-query-hooks"
import CourseQuickViewContainer from "../CourseQuickViewContainer/CourseQuickViewContainer"
import ChatButton from "../ChatButton/ChatButton"
import styles from "./MainSidebar.module.scss"

type MainSidebarProps = {
  selectedComponent : string,
  selectChatFunc: (course: UserClassSection | null) => void,
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
              props.selectChatFunc(null);
            }}>Calender</button>
            <button onClick={() => {
              props.selectComponentFunc("chat");
            }}>Chat</button>
          </div>
          {props.selectedComponent === "calender" ?(
            isLoading ? <span>Loading...</span> :
              isSuccess ? <CourseQuickViewContainer data={data} /> :
                <span>Couldn't load data</span>

          ) : props.selectedComponent === "chat" ?(
            isLoading ? <span>Loading...</span> :
              isSuccess ? <div className={styles["groupchats"]}>
                {user.sections.map((value,index) => <ChatButton data={data} index={index} onClick={() => props.selectChatFunc(value)} />)}
              </div> :
              <span>Couldn't load data</span>
            ) : null
          }
        </div>
      </div>
    </>
  )
}
