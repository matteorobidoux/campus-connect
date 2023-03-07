import { useState } from "react";
import CalendarEvent from "../../../../types/Calendar";
import Calendar from "./Calendar";
import CalendarEventRow from "./CalendarEntry";
import { AddEventEntry } from "./CalendarEntry/AddEventEntry";
import styles from "./CalendarWidget.module.scss";
import { useTranslation } from "react-i18next";

export interface CalendarWidgetProps {
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function CalendarWidget({ }: CalendarWidgetProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [scope, setScope] = useState<"month" | "day">("month");
  const [text, setText] = useState<string>(months[new Date().getMonth()]);
  const [day, setDay] = useState("");

  const {t, i18n} = useTranslation(['events']);

  const onScopeChanged = (scope: "month" | "day", date: Date) => {
    console.log(scope, date);
    setScope(scope);
    if (scope == "month") {
      setText(months[date.getMonth()])
      setDay("")
    } else {
      setDay(`${date.getDate()}`)
    }
  }

  return (
    <div className={styles.wrapper}>
      <Calendar onMonthChanged={(_, evs) => setEvents(evs)} onScopeChanged={onScopeChanged} />
      <div className={styles.right}>
        <div className={styles.header}>
          { i18n.language == "fr" ? <h2> {t("events")} {t("in")} {day} {t(text)}</h2> : <h2> {t("events")} {t("in")} {text} {day}</h2> }
        </div>

        <div className={styles.calendarEventsWrapper}>
          {events.map(ev => <CalendarEventRow event={ev} key={ev.id} />)}
          {scope == "day" && (
            <AddEventEntry />
          )}
        </div>
      </div>
    </div>
  )
}
