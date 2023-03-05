import styles from "./Chat.module.scss"

type ChatProps = {

}

export default function Chat(props: ChatProps) {
  return (
    <div>
      <div className={styles["chat-header"]}>
        <h1>Test</h1>
      </div>
    </div>
  )
}
