import { faCalendar, faFile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserClass } from "../../../../types/UserClass";
import CalendarEventRow from "../CalendarWidget/CalendarEntry";
import { ReactComponent as BottomRightSVG } from "./bottom-right.svg";
import { ReactComponent as TopLeftSVG } from "./top-left.svg";
import styles from "./CourseDetailedViewModal.module.scss";
import { Timeslot } from "./Timeslot";
import Schedule from "../../../../types/Schedule";

export interface CourseDetailedViewModalProps {
  userClass: UserClass;
  close: () => void;
}

export function CourseDetailedViewModal({
  userClass,
  close,
}: CourseDetailedViewModalProps) {
  const groupByDay = (array: Schedule[]): { [key: string]: Schedule[] } => {
    return array.reduce(
      (result: { [key: string]: Schedule[] }, obj: Schedule) => {
        (result[obj.day] = result[obj.day] || []).push(obj);
        return result;
      },
      {}
    );
  };
  const schedules: Schedule[][] = Object.values(groupByDay(userClass.schedule));

  // let schedules: { [key: string]: Schedule[] } = {};

  // userClass.schedule.forEach((s) => {
  //   schedules[s.day].push(s);
  // });

  const halfLength = Math.ceil(schedules.length / 2) ?? 0;
  const leftSide = schedules.slice(0, halfLength - 1) ?? [];
  const rightSide = schedules.slice(halfLength - 1) ?? [];

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

        <div className={styles.schedule}>
          <div className={styles["top-schedule"]}>
            {leftSide.map((s) => (
              <Timeslot schedule={s} />
            ))}
          </div>
          <div className={styles["bottom-schedule"]}>
            {rightSide.map((s) => (
              <Timeslot schedule={s} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bottomWrapper}>
        <BottomRightSVG className={styles.svgRight} />
        <TopLeftSVG className={styles.svgLeft} />
        <div className={styles.wrapperWrapper}>
          <h2> Next Events </h2>
          <div className={styles.bottom}>
            <div className={styles.left}>
              {userClass.events
                .sort((a, b) => b.date.valueOf() - a.date.valueOf())
                .slice(0, 3)
                .map((ev) => (
                  <CalendarEventRow key={ev._id} event={ev} />
                ))}
            </div>

            <div className={styles.right}>
              <div className={styles.entry}>
                {/* Using as any here is necessary because they have a bug with FontAwesome types*/}
                <FontAwesomeIcon icon={faCalendar as any} />
                {userClass.events.length} upcoming events
              </div>
              {/* <div className={styles.entry}>
                <FontAwesomeIcon icon={faFile as any} />5 assignments
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
