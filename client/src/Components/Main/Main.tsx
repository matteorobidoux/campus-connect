import { CalendarWidget } from "../CalendarWidget"
import Chat from "../Chat/Chat"
import styles from "./Main.module.scss"

type MainProps = {
  selectedComponent: string,
  selectedChat: string
}


export default function Main(props: MainProps) {
  return (
    <div className={styles["main-content-container"]}>
      {props.selectedComponent === "calender" ?(
      <CalendarWidget />
      ) : props.selectedComponent === "chat" ?(
        < Chat selectedChat={props.selectedChat}/>
      ) : null
    }
    </div>
  )
}
