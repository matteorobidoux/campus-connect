import CalendarEvent from "../../../../../types/Calendar"
import styles from "./CalendarEntryDetailedModal.module.scss";
import { ReactComponent as Background } from "./background.svg"
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { getRandomColor } from "../../../cssUtils";
import { useTranslation } from "react-i18next";

export interface CalendarEntryDetailedModalProps {
  event: CalendarEvent;
  close: () => void;
}

export function CalendarEntryDetailedModal({ event, close }: CalendarEntryDetailedModalProps) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const [color] = useState(getRandomColor())

  const queryClient = useQueryClient();

  const {t, i18n} = useTranslation(['events']);

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
  console.log(event.date.getMonth())

  return (
    <div className={styles.wrapper}>
      <Background className={styles.svg} color={color} />
      <div className={styles.innerWrapper}>
        <div className={styles.top}>
          <h1> {event.title} </h1>
          <h2> {event.associatedSection.name} </h2>
          { i18n.language == "fr" ? 
            <h2> {t("due")} {event.date.getDay()} {t(monthNames[event.date.getMonth()])} </h2> : 
            <h2> {t("due")} {t(monthNames[event.date.getMonth()])} {event.date.getDay()} </h2> 
          }
        </div>
        <div className={styles.center}>
          <h3> {t("eventDescription")}</h3>
          <p> {event.description} </p>
        </div>
        <div className={styles.botton}>
          <button onClick={() => markAsDone.mutate()}> {t("markAsDone")} </button>
        </div>
      </div>
    </div>
  )
}
