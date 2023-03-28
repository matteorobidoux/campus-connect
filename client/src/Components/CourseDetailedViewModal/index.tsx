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
      <div className={styles.bottomWrapper}>
        <h2> Next Events </h2>
        <div className={styles.bottom}>
          <div className={styles.left}>
            {userClass.events.map((ev) => (
              <CalendarEventRow key={ev._id} event={ev} />
            ))}
          </div>

          <div className={styles.right}>
            <div className={styles.entry}>10 upcoming events</div>
            <div className={styles.entry}>5 assignments</div>
          </div>
        </div>
      </div>
    </div>
  );
}
