import { UserClass } from "../../../../types/UserClass";
import CalendarEventRow from "../CalendarWidget/CalendarEntry";
import styles from "./CourseDetailedViewModal.module.scss";
import { Timeslot } from "./Timeslot";

export interface CourseDetailedViewModalProps {
  userClass: UserClass;
  close: () => void;
}

export function CourseDetailedViewModal({
  userClass,
  close,
}: CourseDetailedViewModalProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.left}>
          <h2> {userClass.courseTitle} </h2>
          <hr />
          <div className={styles.info}>
            <p> {userClass.teacher} </p>
            <p> Section {Number.parseInt(userClass.number)} </p>
          </div>
        </div>

        <div className={styles.right}>
          {userClass.schedule.map((s) => (
            <Timeslot schedule={s} />
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          Next Events
          {userClass.events.map((ev) => (
            <CalendarEventRow key={ev._id} event={ev} />
          ))}
        </div>
      </div>
    </div>
  );
}
