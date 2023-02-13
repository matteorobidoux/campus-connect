import CalendarEvents from "../../../types/Calendar"
import ReactCalendar, { CalendarTileProperties } from "react-calendar"

import 'react-calendar/dist/Calendar.css';
import "./calendar.css"
import { useEffect, useState } from "react";

function isDateImportant({date}: CalendarTileProperties, usedDates: Date[]): string {
  if (usedDates.some(d => date.getDate() == d.getDate() && d.getMonth() == date.getMonth())) {
    return 'used'
  }
  return ''
}

export interface CalendarProps {
  // props
}


export function Calendar({}: CalendarProps) {
  const tomorrow = new Date();
  tomorrow.setDate(1);
  const cEvents: CalendarEvents[] = [{
    id: 'ABC',
    date: tomorrow,
    associatedClass: {name: "Web Development"} ,
    title: 'Submit thingy one',
    description: 'We gotta submit the first sprint demo.',
  }]

  const [clickedDayRef, setClickedDayRef] = useState<EventTarget | null>(null)

  useEffect(() => {
    console.log("Upadte clicked day ref to: ", clickedDayRef)
  }, [clickedDayRef])

  return <div>
    <ReactCalendar
      onClickDay={(_, ev) => setClickedDayRef(ev.currentTarget)}
      tileClassName={(p) => isDateImportant(p, cEvents.map(e => e.date))}
      showNeighboringMonth
      />
  </div>
}
