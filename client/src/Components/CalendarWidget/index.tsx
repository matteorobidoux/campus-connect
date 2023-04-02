import { useState } from "react";
import { Events } from "../../../../types/Event";
import Calendar from "./Calendar";
import CalendarEventRow from "./CalendarEntry";
import { AddEventEntry } from "./CalendarEntry/AddEventEntry";
import styles from "./CalendarWidget.module.scss";
import { useTranslation } from "react-i18next";
import { isDateCurrentDay } from "../../validationUtils";

export interface CalendarWidgetProps {}

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

export function CalendarWidget({}: CalendarWidgetProps) {
  const [events, setEvents] = useState<Events[]>([]);
  const [scope, setScope] = useState<"month" | "day">("month");
  const [month, setMonth] = useState<string>(months[new Date().getMonth()]);
  const [day, setDay] = useState("");
  const [date, setDate] = useState(new Date());

  const { t, i18n } = useTranslation(["events"]);

  const onScopeChanged = (scope: "month" | "day", date: Date) => {
    setScope(scope);
    if (scope === "month") {
      setMonth(months[date.getMonth()]);
      setDay("");
    } else {
      setDay(`${date.getDate()}`);
      setMonth(`${months[date.getMonth()]}`);
      setDate(date);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Calendar
        onMonthChanged={(_, evs) => setEvents(evs)}
        onScopeChanged={onScopeChanged}
      />
      <div className={styles.right}>
        <div className={styles.header}>
          {i18n.language == "fr" || i18n.language == "it" ? (
            <h2>
              {" "}
              {t("events")} {t("in")} {day} {t(month)}
            </h2>
          ) : (
            <h2>
              {" "}
              {t("events")} {t("in")} {month} {day}
            </h2>
          )}
        </div>

        <div className={styles.calendarEventsWrapper}>
          {events.length === 0 && <span>{t("noEvents")}</span>}
          {events.map((ev, key) => (
            <CalendarEventRow event={ev} key={key} />
          ))}
          {scope === "day" && isDateCurrentDay(date) && (
            <AddEventEntry date={date} />
          )}
        </div>
      </div>
    </div>
  );
}
