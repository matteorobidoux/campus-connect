import Course from "../../../../types/Course"
import CourseQuickView from "../CourseQuickView/CourseQuickView"
import styles from "./CourseQuickViewContainer.module.scss"

type CourseQuickViewContainerProps = {
    courses: Course[]
}

export default function CourseQuickViewContainer(props: CourseQuickViewContainerProps) {
    return (
        <>
            <div className={styles["course-quick-view-container"]}>
                {
                    props.courses.map((course, key) => {
                        return (
                            <>
                                <CourseQuickView course={course} key={key} color={course.color} />
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}