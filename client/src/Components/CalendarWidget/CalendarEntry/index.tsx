import { useState } from "react";
import Rodal from "rodal";
import { Events } from "../../../../../types/Event";
import { CalendarEntryDetailedModal } from "../CalendarEntryDetailedModal";
import styles from "./CalendarEntry.module.scss";
import { useTranslation } from "react-i18next";

export interface CalendarEventRowProps {
  event: Events;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CalendarEventRow({ event }: CalendarEventRowProps) {
  console.log(event);
  const [isVisible, setIsVisible] = useState(false);

  const { t } = useTranslation(["events"]);

  return (
    <>
      <div className={styles.wrapper} onClick={() => setIsVisible(true)}>
        <div className={styles.left}>
          <span className={styles.text}>
            {" "}
            {t(months[event.date.getMonth()]).slice(0, 3)}{" "}
          </span>
          <span className={styles.day}> {event.date.getDate()} </span>
        </div>
        <div className={styles.vl} />
        <div className={styles.right}>
          <span className={styles.className}>{event.courseTitle}</span>
          <span className={styles.eventName}>{event.title}</span>
        </div>
      </div>

      <Rodal
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        customStyles={{ borderRadius: "25px", padding: 0, height: "500px" }}
      >
        <CalendarEntryDetailedModal
          event={event}
          close={() => setIsVisible(false)}
        />
      </Rodal>
    </>
  );
}
