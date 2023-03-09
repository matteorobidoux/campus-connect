import profileImg from "../../assets/profile.png"
import canadianFlag from "../../assets/canadianFlag.png"
import styles from "./NavBar.module.scss";
import { useTranslation } from 'react-i18next';
import React from "react";
import { changeLanguage } from "i18next";

//Fix type script BS
type NavBarProps = {
  toggleSidebar: Function
}

function NavBar(props: NavBarProps) {

  const [language, setLanguage] = React.useState('English')

  const { t, i18n } = useTranslation(['app']);

  const langaugeOptions = {English: "en", French: "fr"}

  const handleLanguage = (e: any) => {
    setLanguage(e.target.textContent)
    for(var key in langaugeOptions){
      if(key == e.target.textContent){
        i18n.changeLanguage("en");
      }
    }    
  }

  return (
    <div className={styles.navbar}>
      <nav>
        <div className={styles["lang-menu"]}>
          <div className={styles["selected-lang"]}>
            {language}
          </div>
          <ul>
            <li>
                <p className={styles.en} onClick={handleLanguage}><img src={canadianFlag} alt="Canadian Flag"></img>English</p>
            </li>
            <li>
                <p className={styles.fr} onClick={handleLanguage}>French</p>
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
