import { GetAllSectionsResponse } from "../../../../types/Queries/GetAllCourses";
import CourseQuickView from "../CourseQuickView/CourseQuickView";
import styles from "./CourseQuickViewContainer.module.scss";

type CourseQuickViewContainerProps = {
  data: GetAllSectionsResponse;
};

export default function CourseQuickViewContainer(
  props: CourseQuickViewContainerProps
) {
  return (
    <>
      <div className={styles["course-quick-view-container"]}>
        {props.data.map((course, key) => {
          return <CourseQuickView course={course} key={key} />;
        })}
      </div>
    </>
  );
}
