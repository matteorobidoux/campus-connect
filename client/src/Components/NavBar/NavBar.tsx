import profileImg from "../../assets/profile.png";
import canadianFlag from "../../assets/English.png";
import frenchFlag from "../../assets/French.png";
import italianFlag from "../../assets/Italian.png";
import styles from "./NavBar.module.scss";
import { useTranslation } from "react-i18next";
import React from "react";
import { changeLanguage } from "i18next";

//Fix type script BS
type NavBarProps = {
  toggleSidebar: Function;
  profileUrl: string;
  logoOnClick: Function;
};

function NavBar(props: NavBarProps) {
  const { t, i18n } = useTranslation(["languages"]);

  const [language, setLanguage] = React.useState("English");
  const [emoji, setEmoji] = React.useState(canadianFlag);

  function alterLanguage(lang: string, src: string, e: any) {
    if (e!) {
      if (e.target!) {
        setLanguage(e.target.textContent);
        setEmoji(src);
        changeLanguage(lang);
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
            <li onClick={(e) => alterLanguage("en", canadianFlag, e)}>
              <img
                className={styles.flag}
                src={canadianFlag}
                alt="Canadian Flag"
              ></img>
              <p>{t("English")}</p>
            </li>
            <li onClick={(e) => alterLanguage("fr", frenchFlag, e)}>
              <img
                className={styles.flag}
                src={frenchFlag}
                alt="French Flag"
              ></img>
              <p>{t("French")}</p>
            </li>
            <li onClick={(e) => alterLanguage("it", italianFlag, e)}>
              <img
                className={styles.flag}
                src={italianFlag}
                alt="Italian Flag"
              ></img>
              <p>{t("Italian")}</p>
            </li>
          </ul>
        </div>
        <h1 className={styles.logo}>Campus Connect</h1>
        {props.profileUrl && (
          <img
            className={styles["profileImg"]}
            src={props.profileUrl.length < 1 ? profileImg : props.profileUrl}
            alt="profile"
            referrerPolicy="no-referrer"
            onClick={(e) => {
              e.preventDefault();
              props.toggleSidebar(e);
            }}
          ></img>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
