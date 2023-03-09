import profileImg from "../../assets/profile.png"
import canadianFlag from "../../assets/English.png"
import frenchFlag from "../../assets/French.png"
import styles from "./NavBar.module.scss";
import { useTranslation } from 'react-i18next';
import React from "react";
import { changeLanguage } from "i18next";

//Fix type script BS
type NavBarProps = {
  toggleSidebar: Function
}

function NavBar(props: NavBarProps) {

  const { t, i18n } = useTranslation(['languages']);

  const [language, setLanguage] = React.useState("English")
  const [emoji, setEmoji] = React.useState(canadianFlag)

  function alterLanguage(lang: string, src: string, e: any){
    if(e!){
      if(e.target!){
        setLanguage(e.target.textContent)
        setEmoji(src)
        changeLanguage(lang)
      }
    }
  }

  return (
    <div className={styles.navbar}>
      <nav>
        <div className={styles["lang-menu"]}>
          <div className={styles["selected-lang"]}>
            <img className={styles.flag} src={emoji} alt="Flag"></img>
            <p className={styles.language}> {t(language)} </p>
          </div>
          <ul>
            <li onClick={(e)=> alterLanguage("en", canadianFlag, e)}>
                <img className={styles.flag} src={canadianFlag} alt="Canadian Flag"></img>
                <p className={styles.en}>{t("English")}</p>
            </li>
            <li onClick={(e)=> alterLanguage("fr", frenchFlag, e)}>
                <img className={styles.flag} src={frenchFlag} alt="France Flag"></img>
                <p className={styles.fr}>{t("French")}</p>
            </li>
          </ul>
        </div>
        <h1 className={styles.logo}>Campus Connect</h1>
        <img className={styles["profileImg"]} src={profileImg} alt="profile" onClick={e => {
          e.preventDefault()
          props.toggleSidebar(e)
        }}></img>
      </nav>
    </div>
  );
}

export default NavBar;
