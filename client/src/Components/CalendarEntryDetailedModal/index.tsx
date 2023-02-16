import CalendarEvent from "../../../../types/Calendar"
import styles from "./CalendarEntryDetailedModal.module.scss";
import {ReactComponent as Background} from "./background.svg"
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export interface CalendarEntryDetailedModalProps {
  event: CalendarEvent;
  close: () => void;
}

// Sorry for this. Took from a guy on stak overflow
const colorVariables = Array
  .from(document.styleSheets)
  .filter(styleSheet => {
    try { return styleSheet.cssRules; }
    catch(e) { console.warn(e); }
  })
  .map(styleSheet => Array.from(styleSheet.cssRules))
  .flat()
  .filter((cssRule: any) => cssRule.selectorText === ':root')
  .map(cssRule => cssRule.cssText.split('{')[1].split('}')[0].trim().split(';'))
  .flat()
  .filter(text => text !== "")
  .map(text => text.split(':'))
  .map(parts => ({key: parts[0].trim(), value: parts[1].trim() }))
  .filter(entry => entry.key.includes("--classes-"));

const getRandomColor = () => colorVariables[Math.floor(Math.random() * colorVariables.length)].value;

export function CalendarEntryDetailedModal({event, close}: CalendarEntryDetailedModalProps) {
  const options: Intl.DateTimeFormatOptions = { weekday: undefined, year: 'numeric', month: 'long', day: 'numeric' };
  const [color] = useState(getRandomColor())

  const queryClient = useQueryClient();
  const markAsDone = useMutation(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }, {
      onSuccess: () => queryClient.invalidateQueries({queryKey: ['events']}),
      onSettled: () => { close(); }
    });

  useEffect(() => {
    const toastId = 'updatingEvent';
    if (markAsDone.isLoading) {
      toast.loading("Updating event...", {toastId});
    } else {
      toast.done(toastId)
    }
  }, [markAsDone, markAsDone.isLoading])

  return (
    <div className={styles.wrapper}>
      <Background className={styles.svg} color={color}/>
      <div className={styles.innerWrapper}>
        <div className={styles.top}>
          <h1> { event.title } </h1>
          <h2> { event.associatedSection.name } </h2>
          <h2> Due {event.date.toLocaleDateString(undefined, options)} </h2>
        </div>
        <div className={styles.center}>
          <h3> Event Description </h3>
          <p> {event.description} </p>
        </div>
        <div className={styles.botton}>
          <button onClick={() => markAsDone.mutate()}> Mark as Done </button>
        </div>
      </div>
    </div>
  )
}
