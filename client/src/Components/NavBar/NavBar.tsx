import profileImg from "../../assets/profile.png"
import styles from "./NavBar.module.scss";

//Fix type script BS
type NavBarProps = {
  toggleSidebar: Function
}

function NavBar(props: NavBarProps) {

  return (
    <div className={styles.navbar}>
      <nav>
        <h1 className={styles.logo}>Campus Connect</h1>

        <img id="profile" src={profileImg} alt="profile" onClick={e => {
          e.preventDefault()
          props.toggleSidebar(e)
        }}></img>
      </nav>
    </div>
  );
}

export default NavBar;
