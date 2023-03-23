import Schedule from "../../../../../types/Schedule";
import styles from "./Timeslot.module.scss";

export interface TimeslotProps {
  schedule: Schedule;
}

export function Timeslot({schedule}: TimeslotProps) {
  return <div className={styles.wrapper}>
    <h5> { schedule.day } </h5>
    <p> { schedule.begin } - { schedule.end } </p>
  </div>
}
