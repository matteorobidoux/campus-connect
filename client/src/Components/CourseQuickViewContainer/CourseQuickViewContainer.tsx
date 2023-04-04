import styles from "./CourseQuickViewContainer.module.scss";
import { GetAllSectionsResponse } from "../../../../types/Queries/GetAllCourses";
import CourseQuickView from "../CourseQuickView/CourseQuickView";
import { motion } from "framer-motion";
import { StaggeredFadeInAnimation } from "../../framerMotionAnimations";

type CourseQuickViewContainerProps = {
  data: GetAllSectionsResponse;
};

export default function CourseQuickViewContainer(
  props: CourseQuickViewContainerProps
) {
  const delay: number = 0.05;
  const animation = StaggeredFadeInAnimation(0.1, 0.1, delay, delay);

  return (
    <motion.div
      variants={animation}
      initial="hidden"
      animate="visible"
      className={styles["course-quick-view-container"]}
    >
      {props.data.map((course, key) => (
        <CourseQuickView course={course} key={key} />
      ))}
    </motion.div>
  );
}
