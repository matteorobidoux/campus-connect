import { UserClassSection } from "../../../../types/UserClassSection"
import { CalendarWidget } from "../CalendarWidget"
import Chat from "../Chat/Chat"
import styles from "./Main.module.scss"

<<<<<<< HEAD
export default function Main() {
  
=======
type MainProps = {
  selectedComponent: string,
  selectedChat: UserClassSection | undefined; 
}


export default function Main(props: MainProps) {
>>>>>>> 59e62a7a3128af36884ad41cd32089c7de9eed04
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
