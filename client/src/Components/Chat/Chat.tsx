import styles from "./Chat.module.scss"

type ChatProps = {
  selectedChat : String

}

export default function Chat(props: ChatProps) {
  return (
    <div>
      <div className={styles["chat-header"]}>
        <h1>{props.selectedChat}</h1>
      </div>
    </div>
  )
}
