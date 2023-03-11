import styles from "./Message.module.scss"

type MessageProps = {
    leftOrRight : string,
    message : string,
    user : string,
    time : string
}

export default function Message(props: MessageProps){
    return (
        <div className={styles[props.leftOrRight]}>

            <div className={styles["msg-bubble"]}>
              <div className={styles["msg-info"]}>
                <div className={styles["msg-info-name"]}>{props.user}</div>
                <div className={styles["msg-info-time"]}>{props.time}</div>
              </div>

              <div className={styles["msg-text"]}>
                {props.message}
              </div>
            </div>
          </div>
    )



}