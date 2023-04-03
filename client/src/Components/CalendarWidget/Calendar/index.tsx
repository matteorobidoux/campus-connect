import ReactCalendar, { ViewCallbackProperties } from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCalendarEvents } from "../../../custom-query-hooks";
import { Events } from "../../../../../types/Event";

import { useTranslation } from "react-i18next";

export interface CalendarProps {
  onMonthChanged?: (month: number, events: Events[]) => void;
  onScopeChanged?: (scope: "month" | "day", date: Date) => void;
}

const isSameDDMMYY = (d1: Date, d2: Date) =>
  d1.getMonth() == d2.getMonth() &&
  d2.getDate() == d1.getDate() &&
  d1.getFullYear() == d2.getFullYear();

function getCEvClassName(d1: Date, usedDates: Date[], currentMonth: number) {
  return usedDates
    .filter((usedDate) => currentMonth == usedDate.getMonth())
    .some((usedDate) => isSameDDMMYY(usedDate, d1))
    ? "used"
    : null;
  // usedDates.filter(d => )
  // usedDates.some((d) => isSameDDMMYY(d, d1)) ? "used" : null;
}

/**
 * TODO: Implement API call to fetch all the calendar events.
 * Wrapper for React-Calendar.
 */
export default function Calendar({
  onMonthChanged,
  onScopeChanged,
}: CalendarProps) {
  const [clickedDayRef, setClickedDayRef] = useState<EventTarget | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const [currentDay, setCurrentDay] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const queryEvents = useCalendarEvents();

  const { t, i18n } = useTranslation();

  const handleActiveStartDateChange = (view: ViewCallbackProperties) => {
    if (view.action != "prev" && view.action != "next") return;
    setCurrentMonth(view.activeStartDate.getMonth());
  };

  const handleDayClicked = (date: Date, ev: React.MouseEvent) => {
    if (isSameDDMMYY(date, currentDate)) {
      setCurrentDay(null);
      setCurrentDate(new Date());
      setClickedDayRef(null);
      onScopeChanged?.("month", date);
      return;
    }

    const clickedDay = date.getDate();
    setCurrentDay(clickedDay);
    setClickedDayRef(ev.currentTarget);
    setCurrentDate(date);
    setCurrentMonth(date.getMonth());
    onScopeChanged?.("day", date);
  };

  const filterByDayAndMonth = (cEv: Events) => {
    const evMonth = cEv.date.getMonth();
    if (evMonth != currentMonth) return false;

    if (currentDay) {
      const evDay = cEv.date.getDate();
      return evDay == currentDay;
    }

    return true;
  };

  useEffect(() => {
    if (queryEvents.isLoading) {
      toast.loading("Loading events", { toastId: "loadingEvents" });
      return;
    }

    if (queryEvents.isStale) {
      toast.loading("Re-fetching events", { toastId: "loadingEvents" });
      return;
    }

    toast.done("loadingEvents");
    const matches = queryEvents.data!.filter(filterByDayAndMonth);
    onMonthChanged?.(currentMonth, matches);
  }, [currentMonth, queryEvents.isLoading, queryEvents.isStale, currentDay]);

  return (
    <div>
      <ReactCalendar
        locale={i18n.language}
        onClickDay={handleDayClicked}
        tileClassName={(p) =>
          queryEvents.data
            ? getCEvClassName(
                p.date,
                queryEvents.data.map((e: { date: any }) => e.date),
                currentMonth
              )
            : null
        }
        onActiveStartDateChange={handleActiveStartDateChange}
        minDetail={"year"}
        showFixedNumberOfWeeks
        value={currentDate}
      />
    </div>
  );
}
