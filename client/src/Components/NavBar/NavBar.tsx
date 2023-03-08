import profileImg from "../../assets/profile.png"
import en from "../../assets/en.png"
import styles from "./NavBar.module.scss";
import { useTranslation } from 'react-i18next';
import React from "react";

//Fix type script BS
type NavBarProps = {
  toggleSidebar: Function
}

function NavBar(props: NavBarProps) {

  const [language, setLanguage] = React.useState('en')

  const { t, i18n } = useTranslation(['app']);

  const handleLanguage = (e: any) => {
    setLanguage(e.target.value)
    i18n.changeLanguage(e.target.value);
  }

  return (
    <div className={styles.navbar}>
      <nav>
        <div className={styles["lang-menu"]}>
          <div className={styles["selected-lang"]}>
            English
          </div>
          <ul>
            <li>
                <p className={styles.en}>English</p>
            </li>
            <li>
                <p className={styles.fr}>French</p>
            </li>
          </ul>
        </div>
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
