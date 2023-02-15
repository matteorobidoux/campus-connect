import CalendarEvents from "../../../types/Calendar"
import ReactCalendar, { CalendarTileProperties, ViewCallbackProperties } from "react-calendar"

import 'react-calendar/dist/Calendar.css';
import "./calendar.css"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCalendarEvents } from "../custom-query-hooks";

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

/**
 * TODO: Implement API call to fetch all the calendar events.
 * Wrapper for React-Calendar.
*/
export default function Calendar({onMonthChanged}: CalendarProps) {
  const [clickedDayRef, setClickedDayRef] = useState<EventTarget | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const queryEvents = useCalendarEvents();

  const handleActiveStartDateChange = (view: ViewCallbackProperties) => {
    if (view.action != "prev" && view.action != "next") return;
    setCurrentMonth(view.activeStartDate.getMonth());
  }



  useEffect(() => {
    if (queryEvents.isLoading == true) {
      toast.loading("loading events", {toastId: 'loadingEvents'});
      return;
    }
    toast.update('loadingEvents', {render: 'loaded!', autoClose: 1000, type: 'success', isLoading: false});
    const matches = queryEvents.data!.filter(ev => currentMonth == ev.date.getMonth());
    onMonthChanged?.(currentMonth, matches);
    console.log(queryEvents.data)

  }, [currentMonth, queryEvents.isSuccess])

  useEffect(() => { console.log("Update clicked day ref") }, [clickedDayRef])

  return <div>
    <ReactCalendar
      onClickDay={(_, ev) => setClickedDayRef(ev.currentTarget)}
      tileClassName={(p) => queryEvents.data ? isDateImportant(p, queryEvents.data.map(e => e.date)) : ""}
      onActiveStartDateChange={handleActiveStartDateChange}
      minDetail={'year'}
      showFixedNumberOfWeeks={true}
    />
  </div>
}
