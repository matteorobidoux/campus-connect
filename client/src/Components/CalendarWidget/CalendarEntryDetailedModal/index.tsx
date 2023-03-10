import styles from "./CalendarEntryDetailedModal.module.scss";
import { ReactComponent as Background } from "./background.svg"
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { getRandomColor } from "../../../cssUtils";
import { Events } from "../../../../../types/Event";
import { useSections, useUser } from "../../../custom-query-hooks";

export interface CalendarEntryDetailedModalProps {
  event: Events;
  close: () => void;
}

export function CalendarEntryDetailedModal({ event, close }: CalendarEntryDetailedModalProps) {
  const options: Intl.DateTimeFormatOptions = { weekday: undefined, year: 'numeric', month: 'long', day: 'numeric' };
  const [color] = useState(getRandomColor())

  //Check for User and creation of button if User
  const user = useUser();
  const sectionsQuery = useSections({userClassSections: user.sections})


  const queryClient = useQueryClient();
  const markAsDone = useMutation(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }, {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] }),
    onSettled: () => { close(); }
  });

  useEffect(() => {
    const toastId = 'updatingEvent';
    if (markAsDone.isLoading) {
      toast.loading("Updating event...", { toastId });
    } else {
      toast.done(toastId)
    }
  }, [markAsDone, markAsDone.isLoading])

  return (
    <div className={styles.wrapper}>
      <Background className={styles.svg} color={color} />
      <div className={styles.innerWrapper}>
        <div className={styles.top}>
          <h1> {event.title} </h1>
          <h2> {event.courseTitle} </h2>
          <h2> Due {event.date.toLocaleDateString(undefined, options)} </h2>
        </div>
        <div className={styles.center}>
          <h3> Event Description </h3>
          <p> {event.desc} </p>
        </div>
        <div className={styles.botton}>
          <button onClick={() => markAsDone.mutate()}> Mark as Done </button>
        </div>
      </div>
    </div>
  )
}
