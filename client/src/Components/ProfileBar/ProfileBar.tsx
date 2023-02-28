import styles from "./ProfileBar.module.scss"
import closeImg from "../../close.png"
import Rodal from "rodal"

//fix type script stuff
type ProfileBarProps = {
  isOpen: boolean,
  toggleFunc: () => void
}

export default function ProfileBar(props: ProfileBarProps) {

  return (
    <>
      <Rodal
        visible={props.isOpen}
        animation={"slideRight"}
        duration={150}
        customStyles={{
          height: "100%",
          minWidth: "300px",
          bottom: 0,
          padding: 0,
          margin: "0 0 0 auto",
          width: "20%",
        }}
        showMask={true}
        showCloseButton={false}
        closeMaskOnClick={true}
        onClose={() => { props.toggleFunc() }}>
        <div className={styles.profileBar}>
          <img className={styles.closeProfile} src={closeImg} alt="close icon" onClick={e => {
            e.preventDefault()
            props.toggleFunc()
          }}></img>
          <h1>Login</h1>
          <form className={styles.login} id="login">
            <label htmlFor="username">Username</label>
            <input className={styles.username} id="username" type="text" />
            <label htmlFor="password">Password</label>
            <input className={styles.password} id="password" type="password" />
            <input className={styles.submit} id="submit" type="submit" onClick={e => {
              e.preventDefault()
              fetch('/api/authenticate').then(async r => {
                const k = await r.json();
                console.log(k.authorizationUrl);
                window.location.href = k.authorizationUrl;
              })
            }} value="Login" />
          </form>
        </div>
      </Rodal>
    </>
  )
}
