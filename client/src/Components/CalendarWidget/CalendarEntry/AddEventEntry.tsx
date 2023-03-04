import styles from "./CalendarEntry.module.scss"
import Rodal from 'rodal';

// include styles
import 'rodal/lib/rodal.css';
import { useState } from "react";
import CalendarEntryModal from "../CalendarEntryModal";

export interface AddEventEntryProps {
}

export function AddEventEntry({}: AddEventEntryProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleOnAdd = () => {
    setIsVisible(true);
  }

  return (
    <>
    <div className={styles.wrapper + " " + styles.selectable} onClick={handleOnAdd}>
      <p className={styles.plus}> + </p>
    </div>
    <Rodal visible={isVisible} onClose={() => setIsVisible(false)} height={500}>
      <CalendarEntryModal onClose={() => setIsVisible(false)}/>
    </Rodal>
    </>
  )
}
