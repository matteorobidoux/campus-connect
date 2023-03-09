import profileImg from "../../assets/profile.png"
import styles from "./NavBar.module.scss";

//Fix type script BS
type NavBarProps = {
  toggleSidebar: Function,
  profileUrl: string
}

function NavBar(props: NavBarProps) {
  return (
    <div className={styles.navbar}>
      <nav>
        <h1 className={styles.logo}>Campus Connect</h1>
        {props.profileUrl === "" ?(
          <img className={styles["profileImg"]} src={profileImg} alt="profile" referrerPolicy="no-referrer" onClick={e => {
            e.preventDefault()
          props.toggleSidebar(e)
          }}></img>
          ) : props.profileUrl.length > 1 ?(
            <img className={styles["profileImg"]} src={props.profileUrl} alt="profile" onClick={e => {
              e.preventDefault()
            props.toggleSidebar(e)
            }}></img>
          ) : null
        }   
      </nav>
    </div>
  );
}

export default NavBar;
