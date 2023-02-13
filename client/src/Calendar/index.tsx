import CalendarEvents from "../../../types/Calendar"
import ReactCalendar, { CalendarTileProperties, ViewCallbackProperties } from "react-calendar"

import 'react-calendar/dist/Calendar.css';
import "./calendar.css"
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

function isDateImportant({date}: CalendarTileProperties, usedDates: Date[]): string {
  if (
    usedDates.some(d => date.getDate() == d.getDate()
    && d.getMonth() == date.getMonth())
  ) {
    return 'used'
  }
  return ''
}

async function getCalendarEvents() {
  const tomorrow = new Date();
  tomorrow.setDate(1);
  const cEvents: CalendarEvents[] = [{
    id: 'ABC',
    date: tomorrow,
    associatedSection: { name: "Web Development" } ,
    title: 'Submit thingy one',
    description: 'We gotta submit the first sprint demo.',
  }]
  return cEvents;
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
  const queryEvents = useQuery('events', getCalendarEvents)

  const handleActiveStartDateChange = (view: ViewCallbackProperties) => {
    if (view.action != "prev" && view.action != "next") return;
    const matches = queryEvents.data!
      .filter(ev => view.activeStartDate.getMonth() == ev.date.getMonth());
    onMonthChanged?.(view.activeStartDate.getDate(), matches);
  }

  useEffect(() => { console.log("Update clicked day ref") }, [clickedDayRef])

  return <div>
    <ReactCalendar
      onClickDay={(_, ev) => setClickedDayRef(ev.currentTarget)}
      tileClassName={(p) => queryEvents.data ? isDateImportant(p, queryEvents.data.map(e => e.date)) : ""}
      onActiveStartDateChange={handleActiveStartDateChange}
      minDetail={'year'}
      showNeighboringMonth
      />
  </div>
}
