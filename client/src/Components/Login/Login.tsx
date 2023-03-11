import { useState } from "react"
import styles from "./Login.module.scss"
import CourseEntryWidget from "../CourseEntryWidget/CourseEntryWidget"
import { useTranslation } from "react-i18next"

export default function Login() {
  const [firstLogin, setFirstLogin] = useState(false);

  const {t, i18n} = useTranslation(["login"]);

  const onConnectWithGoogle = () => {
    fetch('/api/authenticate').then(async r => {
      const k = await r.json();
      console.log(k.authorizationUrl);
      window.location.href = k.authorizationUrl;
    })
  }

  return (
    <div className={styles["login-container"]}>
      <div className={styles["background-image-filter"]}>
        <div className={styles["options-menu"]}>
          {!firstLogin ?
            <>
              <h1 className={styles.title}>{t("welcome")}</h1>
              <h4 className={styles.message}>{t("selectOption")}</h4>
              <button onClick={onConnectWithGoogle }>{t("connect")}</button>
            </> :
            <>
              <CourseEntryWidget />
            </>
          }
        </div>
      </div>
    </div>
  )
}