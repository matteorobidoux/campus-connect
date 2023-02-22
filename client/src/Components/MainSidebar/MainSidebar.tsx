import Course from "../../../../types/Course"
import CourseQuickViewContainer from "../CourseQuickViewContainer/CourseQuickViewContainer"
import styles from "./MainSidebar.module.scss"


type MainSidebarProps = {
    courses: Course[]
}

export default function MainSidebar(props: MainSidebarProps) {
    return (
        <>
            <div className={styles["main-sidebar-container"]}>
                <div className={[styles["sidebar-section"], styles["links"]].join(" ")}>
                    <h2>Classes</h2>
                    <h2>GroupChats</h2>
                    <h2>Bookstore</h2>
                    <h2>Calendar</h2>
                </div>
                <div className={[styles["sidebar-section"], styles["classes"]].join(" ")}>
                    <CourseQuickViewContainer courses={props.courses} />
                </div>
            </div>
        </>
    )
}
