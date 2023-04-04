import Schedule from "../../../../../types/Schedule";
import styles from "./Timeslot.module.scss";
import { useTranslation } from "react-i18next";

export interface TimeslotProps {
  schedule: Schedule[];
}

export function Timeslot({ schedule }: TimeslotProps) {
  const { t } = useTranslation(["course"]);

  return (
    <div className={styles.wrapper}>
      <h5> {t(schedule[0].day)} </h5>
      {schedule.map((s, index) => (
        <p key={index}>
          {s.begin} - {s.end}
        </p>
      ))}
    </div>
  );
}
