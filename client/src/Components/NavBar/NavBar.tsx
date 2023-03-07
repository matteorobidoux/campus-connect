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
        <select className={styles.languageSelect} value={language} onChange={handleLanguage}>
            <option className={styles.languageOption} value="en">English</option>
            <option className={styles.languageOption} value="fr">French</option>
        </select>
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
