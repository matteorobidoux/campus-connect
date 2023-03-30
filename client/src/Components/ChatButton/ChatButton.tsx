import { GetAllSectionsResponse } from "../../../../types/Queries/GetAllCourses";
import { FadeInAnimation } from "../../framerMotionAnimations";
import styles from "./ChatButton.module.scss";
import { motion } from "framer-motion";

type ChatButtonProps = {
  data: GetAllSectionsResponse;
  index: any;
  onClick: any;
};

export default function ChatButton(props: ChatButtonProps) {
  const animation = FadeInAnimation(0.15);

  return (
    <motion.div
      className={styles["button-container"]}
      onClick={props.onClick}
      variants={animation}
    >
      <div className={styles["button"]}>
        <h2>{props.data[props.index].courseTitle}</h2>
        <h4>Last message placeholder</h4>
        <div className={styles.bubble}></div>
      </div>
    </motion.div>
  );
}
