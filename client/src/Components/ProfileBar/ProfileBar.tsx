import styles from "./ProfileBar.module.scss"
import closeImg from "../../assets/close.png"
import Rodal from "rodal"
import { removeUser } from "../../custom-query-hooks/useGoogleOAuth"
import { useQueryClient } from "react-query"
import profileImg from "../../assets/profile.png"

//fix type script stuff
type ProfileBarProps = {
  isOpen: boolean,
  toggleFunc: () => void,
  profileUrl: string
}

export default function ProfileBar(props: ProfileBarProps) {
  const qc = useQueryClient();

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
          {props.profileUrl === "" ?(
          <img className={styles["profileImg"]} src={profileImg} alt="profile" referrerPolicy="no-referrer"></img>
          ) : props.profileUrl.length > 1 ?(
            <img className={styles["profileImg"]} referrerPolicy="no-referrer" src={props.profileUrl} alt="profile"></img>
          ) : null
        } 
        <button className={styles.changeProfileImg}>Change</button>
        <h1>Elidjay Ross</h1>
        <div className={styles.profileInfo}>
        <h3>School: Dawson College</h3>
        <h3>Program: Computer Science</h3>
        <h3>Total Courses: 5</h3>
        <h3>Active Events: 7</h3>
        <h3>Completed Events: 3</h3>

        </div>
          <button className={styles.logout} onClick={() => {
            removeUser();
            qc.invalidateQueries(['user']);
            window.location.reload();
          }}> Logout </button>
        </div>
      </Rodal>
    </>
  )
}
