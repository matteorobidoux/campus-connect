import { UserClass } from "../../../../types/UserClass";
import { FadeInAnimation } from "../../framerMotionAnimations";
import styles from "./CourseQuickView.module.scss";
import { motion } from "framer-motion";

type CourseQuickViewProps = {
  course: UserClass;
  key: number;
};

export default function CourseQuickView(props: CourseQuickViewProps) {
  const animation = FadeInAnimation(0.15);

  return (
    <motion.div
      variants={animation}
      className={styles["course-quick-view"]}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <h2>{props.course.courseTitle}</h2>
      {/* Keep TBA but pririotize passed section teacher prop */}
      <h4>{props.course.teacher || "TBA"}</h4>
      <div className={styles.bubble}></div>
    </motion.div>
  );
}
