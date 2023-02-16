import CalendarEvent from "../../../../types/Calendar"
import styles from "./CalendarEntryDetailedModal.module.scss";
import {ReactComponent as Background} from "./background.svg"

export interface CalendarEntryDetailedModalProps {
  event: CalendarEvent;
  close: () => void;
}

// const svg = (
// <svg width="333" height="156" viewBox="0 0 333 156" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path d="M-13.4873 143.934C391.205 201.934 785.767 16.889 185.103 -62.4117C-415.56 -141.712 -418.18 85.9341 -13.4873 143.934Z" fill="#D0FFB4" stroke="white"/>
// </svg>
// )

export function CalendarEntryDetailedModal({event, close}: CalendarEntryDetailedModalProps) {
  const options: Intl.DateTimeFormatOptions = { weekday: undefined, year: 'numeric', month: 'long', day: 'numeric' };


  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <Background className={styles.svg}/>
        <h1> { event.title } </h1>
        <h2> { event.associatedSection.name } </h2>
        <h2> Due {event.date.toLocaleDateString(undefined, options)} </h2>
      </div>
    </div>
  )
}
