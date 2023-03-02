import { GetAllSectionsResponse } from "../../../../types/Queries/GetAllCourses"
import { UserClass } from "../../../../types/UserClass"
import CourseQuickView from "../CourseQuickView/CourseQuickView"
import styles from "./CourseQuickViewContainer.module.scss"

type CourseQuickViewContainerProps = {
	data: GetAllSectionsResponse
}

export default function CourseQuickViewContainer(props: CourseQuickViewContainerProps) {

	// if (!props.data) {
	// 	return null
	// }

	return (
		<>
			<div className={styles["course-quick-view-container"]}>
				{
					props.data.response.map((course, key) => {
						return (
							<CourseQuickView course={course} key={key} />
						)
					})
				}
			</div>
		</>
	)
}
