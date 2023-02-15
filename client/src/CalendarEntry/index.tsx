import CalendarEvent from "../../../types/Calendar"
import styles from "./CalendarEntry.module.scss"

export interface CalendarEventRowProps {
  event: CalendarEvent;
}

export default function CalendarEventRow({event}: CalendarEventRowProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <text className={styles.text}> Day </text>
        <text className={styles.day}> {event.date.getDate()} </text>
      </div>
      <div className={styles.vl}/>
      <div className={styles.right}>
        <text className={styles.className}>
          {event.associatedSection.name}
        </text>
        <text className={styles.eventName}>
          {event.title}
        </text>
      </div>
    </div>
  )
}
