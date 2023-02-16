import { CalendarWidget } from "../CalendarWidget"
import styles from "./Main.module.scss"

export default function Main() {
  return (
    <div className="main-content-container">
      <p>Main</p>
      <CalendarWidget />
    </div>
  )
}
