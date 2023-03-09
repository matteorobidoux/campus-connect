import { UserClassSection } from "../../../../types/UserClassSection"
import { CalendarWidget } from "../CalendarWidget"
import Chat from "../Chat/Chat"
import styles from "./Main.module.scss"

type MainProps = {
  selectedComponent: string,
  selectedChat: UserClassSection | undefined; 
}


export default function Main(props: MainProps) {
  return (
    <div className={styles["main-content-container"]}>
      {!props.selectedChat ?(
      <CalendarWidget />
      ) : props.selectedComponent === "chat" ?(
        < Chat selectedChat={props.selectedChat}/>
      ) : null
    }
    </div>
  )
}
