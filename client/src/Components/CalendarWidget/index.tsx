import { useEffect, useState } from "react";
import CalendarEvent from "../../../../types/Calendar";
import { Events } from "../../../../types/Event";
import Calendar from "./Calendar";
import CalendarEventRow from "./CalendarEntry";
import { AddEventEntry } from "./CalendarEntry/AddEventEntry";
import styles from "./CalendarWidget.module.scss";
import { useTranslation } from "react-i18next";
import { useUser } from "../../custom-query-hooks";
export interface CalendarWidgetProps { }

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

export function CalendarWidget({ }: CalendarWidgetProps) {
  const [events, setEvents] = useState<Events[]>([]);
  const [showAll, setShow]= useState(true);
  const [eventsFiltered, setEventsFiltered] = useState<Events[]>([]);
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
  const user = useUser();
  const filterEvents = (eventsToFilter: Events[]) => {
    //Check for User and creation of button if User
    if (user.completedEvents.length !== 0) {
      let completedEvents = user.completedEvents.map(e => { return e.id })
      let filteredEvents = eventsToFilter.filter(evs => !completedEvents.includes(evs.mongoId!))
      return filteredEvents
    } else {
      return eventsToFilter
    }
  };

  useEffect(() => {
    if(showAll){
      setEventsFiltered(events);
      return;
    }
     setEventsFiltered(filterEvents(events));
     
  }, [events, showAll])

  const isNewEventDateValid = (date: Date): boolean => {
    const currentDate = new Date();
    return (
      (date.getFullYear() === currentDate.getFullYear() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getDate() === currentDate.getDate()) ||
      date > currentDate
    );
  };

  return (
    <div className={styles.wrapper}>
      <Calendar
          onMonthChanged={(_, evs) => setEvents(((evs)))}
          onScopeChanged={onScopeChanged}
      />

      <div className={styles.right}>
        <div className={styles.botton}>
        <button onClick={() => setShow(!showAll)}> {showAll ? "Hide" : "Show"} completed events</button>
        </div>
        
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
          {eventsFiltered.length === 0 && <span>{t("noEvents")}</span>}
          {eventsFiltered.map((ev, key) => (
            <CalendarEventRow event={ev} key={key} />
          ))}
          {scope === "day" && isNewEventDateValid(date) && (
            <AddEventEntry date={date} />
          )}
        </div>
      </div>
    </div>
  );
}
