import styles from "./ProfileBar.module.scss"
import closeImg from "../../close.png"

//fix type script stuff
type ProfileBarProps = {
    isOpen: boolean,
    toggleFunc: Function
}

export default function ProfileBar(props: ProfileBarProps) {
    return (
        <div className={styles.profileBar} style={{ right: props.isOpen ? "0%" : "-30%" }}>
            <img className={styles.closeProfile} src={closeImg} alt="close icon" onClick={e => {
                e.preventDefault()
                props.toggleFunc(e)
            }}></img>
            <h1>Login</h1>
            <form className={styles.login} id="login">
                <label htmlFor="username">Username</label>
                <input className={styles.username} id="username" type="text" />
                <label htmlFor="password">Password</label>
                <input className={styles.password} id="password" type="password" />
                <input className={styles.submit} id="submit" type="submit" onClick={e => {
                    e.preventDefault()
                }} value="Login"/>
            </form>
        </div>
    )
}
