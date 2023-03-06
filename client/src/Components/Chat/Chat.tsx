import styles from "./Chat.module.scss"

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
          <div className={styles["left-msg"]}>
            <div className={styles["msg-img"]}></div>

            <div className={styles["msg-bubble"]}>
              <div className={styles["msg-info"]}>
                <div className={styles["msg-info-name"]}>GANG</div>
                <div className={styles["msg-info-time"]}>12:45</div>
              </div>

              <div className={styles["msg-text"]}>
                Chat chahtahhc hchhchchchchatttttt
              </div>
            </div>
          </div>

          <div className={styles["right-msg"]}>
            <div className={styles["msg-img"]}></div>

            <div className={styles["msg-bubble"]}>
              <div className={styles["msg-info"]}>
                <div className={styles["msg-info-name"]}>Jean Miche</div>
                <div className={styles["msg-info-time"]}>12:46</div>
              </div>

              <div className={styles["msg-text"]}>
                CHAT CHCAHHCSHSHCHSsssss
              </div>
            </div>
          </div>
          <div className={styles["left-msg"]}>
            <div className={styles["msg-img"]}></div>

            <div className={styles["msg-bubble"]}>
              <div className={styles["msg-info"]}>
                <div className={styles["msg-info-name"]}>GANG</div>
                <div className={styles["msg-info-time"]}>12:45</div>
              </div>

              <div className={styles["msg-text"]}>
                Chat chahtahhc hchhchchchchatttttt
              </div>
            </div>
          </div>

          <div className={styles["right-msg"]}>
            <div className={styles["msg-img"]}></div>

            <div className={styles["msg-bubble"]}>
              <div className={styles["msg-info"]}>
                <div className={styles["msg-info-name"]}>Jean Miche</div>
                <div className={styles["msg-info-time"]}>12:46</div>
              </div>

              <div className={styles["msg-text"]}>
                CHAT CHCAHHCSHSHCHSsssss
              </div>
            </div>
          </div>
          <div className={styles["left-msg"]}>
            <div className={styles["msg-img"]}></div>

            <div className={styles["msg-bubble"]}>
              <div className={styles["msg-info"]}>
                <div className={styles["msg-info-name"]}>GANG</div>
                <div className={styles["msg-info-time"]}>12:45</div>
              </div>

              <div className={styles["msg-text"]}>
                Chat chahtahhc hchhchchchchatttttt
              </div>
            </div>
          </div>

          <div className={styles["right-msg"]}>
            <div className={styles["msg-img"]}></div>

            <div className={styles["msg-bubble"]}>
              <div className={styles["msg-info"]}>
                <div className={styles["msg-info-name"]}>Jean Miche</div>
                <div className={styles["msg-info-time"]}>12:46</div>
              </div>

              <div className={styles["msg-text"]}>
                CHAT CHCAHHCSHSHCHSsssss
              </div>
            </div>
          </div>
          <div className={styles["left-msg"]}>
            <div className={styles["msg-img"]}></div>

            <div className={styles["msg-bubble"]}>
              <div className={styles["msg-info"]}>
                <div className={styles["msg-info-name"]}>GANG</div>
                <div className={styles["msg-info-time"]}>12:45</div>
              </div>

              <div className={styles["msg-text"]}>
                Chat chahtahhc hchhchchchchatttttt
              </div>
            </div>
          </div>

          <div className={styles["right-msg"]}>
            <div className={styles["msg-img"]}></div>

            <div className={styles["msg-bubble"]}>
              <div className={styles["msg-info"]}>
                <div className={styles["msg-info-name"]}>Jean Miche</div>
                <div className={styles["msg-info-time"]}>12:46</div>
              </div>

              <div className={styles["msg-text"]}>
                CHAT CHCAHHCSHSHCHSsssss
              </div>
            </div>
          </div>
          <div className={styles["left-msg"]}>
            <div className={styles["msg-img"]}></div>

            <div className={styles["msg-bubble"]}>
              <div className={styles["msg-info"]}>
                <div className={styles["msg-info-name"]}>GANG</div>
                <div className={styles["msg-info-time"]}>12:45</div>
              </div>

              <div className={styles["msg-text"]}>
                Chat chahtahhc hchhchchchchatttttt
              </div>
            </div>
          </div>

          <div className={styles["right-msg"]}>
            <div className={styles["msg-img"]}></div>

            <div className={styles["msg-bubble"]}>
              <div className={styles["msg-info"]}>
                <div className={styles["msg-info-name"]}>Jean Miche</div>
                <div className={styles["msg-info-time"]}>12:46</div>
              </div>

              <div className={styles["msg-text"]}>
                CHAT CHCAHHCSHSHCHSsssss
              </div>
            </div>
          </div>
        </main>

        <form className={styles["msger-inputarea"]}>
          <input type="text" className={styles["msger-input"]} placeholder="Enter your message..."></input>
          <button type="submit" className={styles["msger-send-btn"]}>Send</button>
        </form>
</section>


    </div>

  )
}
