import { useState } from "react";
import CalendarEvent from "../../../../types/Calendar";
import Calendar from "../Calendar";
import CalendarEventRow from "../CalendarEntry";
import { AddEventEntry } from "../CalendarEntry/AddEventEntry";
import styles from "./CalendarWidget.module.scss";

export interface CalendarWidgetProps {
}

export function CalendarWidget({}: CalendarWidgetProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  return (
    <div className={styles.wrapper}>
      <Calendar onMonthChanged={(_, evs)=> setEvents(evs)}/>
      <div className={styles.calendarEventsWrapper}>
        {events.map(ev => <CalendarEventRow event={ev} key={ev.id}/>)}
        <AddEventEntry/>
      </div>
    </div>
  )
}
