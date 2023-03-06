import styles from "./Chat.module.scss"
import Message from "../Message/Message"

type ChatProps = {
  selectedChat : String

}
//TODO: Change main bar depending on component selected
//TODO: Change message input/button/route depending on groupchat selected
//TODO: Make message into components

export default function Chat(props: ChatProps) {
  return (
    <div className={styles["main-chat"]}>
      <section className={styles["msger"]}>
        <header className={styles["msger-header"]}>
          <div className={styles["msger-header-title"]}>
            <i className={styles["fas fa-comment-alt"]}></i> 
            {props.selectedChat}
          </div>
          <div className={styles["msger-header-options"]}>
            <span><i className={styles["fas fa-cog"]}></i></span>
          </div>
        </header>

        <main className={styles["msger-chat"]}>
         <Message leftOrRight={"left-msg"} user={"Mister White"} time={"12:45"} message={"asdaosdmaosmdoamsdoiasmdoiasmdoiamsdiomasdiomasoidm"}/>
         <Message leftOrRight={"right-msg"} user={"Jessy Pinkman"} time={"12:46"} message={"asdaosdmaasdasoihdouashdouahsduohasuidhasouhdouahdouahsdonasodnjaosdnua9sdnlasjodbhas7idhnl asjdbasdubjla m.sdgasjdbasl .d,a,sdhasndk; ,/as,nlbugasdbj "}/>
        </main>

        <form className={styles["msger-inputarea"]}>
          <input type="text" className={styles["msger-input"]} placeholder="Enter your message..."></input>
          <button type="submit" className={styles["msger-send-btn"]}>Send</button>
        </form>
</section>


    </div>

  )
}
