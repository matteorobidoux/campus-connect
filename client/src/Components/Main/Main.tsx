import { CalendarWidget } from "../CalendarWidget"
import styles from "./Main.module.scss"

export default function Main() {
  return (
    <div className={styles["main-content-container"]}>
      <CalendarWidget />
    </div>
  )
}
