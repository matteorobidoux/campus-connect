import styles from "./ProfileBar.module.scss"
import closeImg from "../../assets/close.png"
import Rodal from "rodal"
import { removeUser } from "../../custom-query-hooks/useGoogleOAuth"
import { useQueryClient } from "react-query"

//fix type script stuff
type ProfileBarProps = {
  isOpen: boolean,
  toggleFunc: () => void
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
