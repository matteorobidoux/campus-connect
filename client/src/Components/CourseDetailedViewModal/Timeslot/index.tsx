import Schedule from "../../../../../types/Schedule";
import styles from "./Timeslot.module.scss";

export interface TimeslotProps {
  schedule: Schedule[];
}

export function Timeslot({ schedule }: TimeslotProps) {
  return (
    <div className={styles.wrapper}>
      <h5> {schedule[0].day} </h5>
      {schedule.map((s, index) => (
        <p key={index}>
          {s.begin} - {s.end}
        </p>
      ))}
    </div>
  );
}
