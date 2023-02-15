import CalendarEvents from "../../../../types/Calendar"
import ReactCalendar, { CalendarTileProperties, ViewCallbackProperties } from "react-calendar"

import 'react-calendar/dist/Calendar.css';
import "./calendar.css"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCalendarEvents } from "../../custom-query-hooks";
import CalendarEvent from "../../../../types/Calendar";

function isDateImportant({date}: CalendarTileProperties, usedDates: Date[]): string {
  if (
    usedDates.some(d => date.getDate() == d.getDate()
    && d.getMonth() == date.getMonth())
  ) {
    return 'used'
  }
  return ''
}

export interface CalendarProps {
  onMonthChanged?: (month: number, events: CalendarEvents[]) => void;
}

function sameDayAndMonth(d1: Date, d2: Date) {
  return (d1.getMonth() == d2.getMonth() && d2.getDate() == d1.getDate());
}

/**
 * TODO: Implement API call to fetch all the calendar events.
 * Wrapper for React-Calendar.
*/
export default function Calendar({onMonthChanged}: CalendarProps) {
  const [clickedDayRef, setClickedDayRef] = useState<EventTarget | null>(null)
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
  const [currentDay, setCurrentDay] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const queryEvents = useCalendarEvents();

  const handleActiveStartDateChange = (view: ViewCallbackProperties) => {
    if (view.action != "prev" && view.action != "next") return;
    setCurrentMonth(view.activeStartDate.getMonth());
  }

  const handleDayClicked = (date: Date, ev: React.MouseEvent) => {
    if (sameDayAndMonth(date, currentDate)) {
      setCurrentDay(null);
      setCurrentDate(new Date());
      setClickedDayRef(null);
      return;
    }

    const clickedDay = date.getDate();
    setCurrentDay(clickedDay);
    setClickedDayRef(ev.currentTarget);
    setCurrentDate(date);
  }

  const filterByDayAndMonth = (cEv: CalendarEvent) => {
    const evMonth = cEv.date.getMonth();
    if (evMonth != currentMonth) return false;

    if (currentDay) {
      const evDay = cEv.date.getDate()
      return evDay == currentDay;
    }

    return true;
  }

  useEffect(() => {
    if (queryEvents.isLoading) {
      toast.loading("loading events", {toastId: 'loadingEvents'});
      return;
    }
    toast.done('loadingEvents');
    const matches = queryEvents.data!.filter(filterByDayAndMonth);
    onMonthChanged?.(currentMonth, matches);
  }, [currentMonth, queryEvents.isSuccess, currentDay])

  return <div>
    <ReactCalendar
      onClickDay={handleDayClicked}
      tileClassName={(p) => queryEvents.data ? isDateImportant(p, queryEvents.data.map(e => e.date)) : ""}
      onActiveStartDateChange={handleActiveStartDateChange}
      minDetail={'year'}
      showFixedNumberOfWeeks={true}
      value={currentDate}
    />
  </div>
}
