import { ColoredCourse } from "../../../../types/Course"
import CourseQuickView from "../CourseQuickView/CourseQuickView"
import styles from "./CourseQuickViewContainer.module.scss"

type CourseQuickViewContainerProps = {
	courses: ColoredCourse[]
}

export default function CourseQuickViewContainer(props: CourseQuickViewContainerProps) {
	return (
		<>
			<div className={styles["course-quick-view-container"]}>
				{
					props.courses.map((course, key) => {
						return (
							<CourseQuickView key={key} color={course.color} title={course.title} number={course.number} sections={course.sections} />
						)
					})
				}
			</div>
		</>
	)
}
