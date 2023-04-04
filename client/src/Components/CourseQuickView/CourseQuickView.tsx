import { useState } from "react";
import Rodal from "rodal";
import { UserClass } from "../../../../types/UserClass";
import { CourseDetailedViewModal } from "../CourseDetailedViewModal";
import styles from "./CourseQuickView.module.scss";
import { motion } from "framer-motion";
import { FadeInAnimation } from "../../framerMotionAnimations";

type CourseQuickViewProps = {
  course: UserClass;
  key: number;
};

export default function CourseQuickView(props: CourseQuickViewProps) {
  const [animateBubble, setAnimateBubble] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const animation = FadeInAnimation(0.15);

  return (
    <>
      <Rodal
        className={styles.rodal}
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        height={600}
        width={800}
        customStyles={{
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          boxShadow: "none",
        }}
      >
        <CourseDetailedViewModal
          userClass={props.course}
          close={() => setIsVisible(false)}
        />
      </Rodal>
      <motion.div
        variants={animation}
        className={styles["course-quick-view"]}
        onClick={(e) => {
          e.preventDefault();
          setIsVisible(true);
        }}
      >
        <h2>{props.course.courseTitle}</h2>
        {/* Keep TBA but pririotize passed section teacher prop */}
        <h4>{props.course.teacher || "TBA"}</h4>
        <div className={styles.bubble}></div>
      </motion.div>
    </>
  );
}
