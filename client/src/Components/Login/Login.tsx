import { useState } from "react"
import styles from "./Login.module.scss"
import CourseEntryWidget from "../CourseEntryWidget/CourseEntryWidget"

export default function Login() {
  const [firstLogin, setFirstLogin] = useState(false);

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
              <h1 className={styles.title}>Welcome to Campus Connect</h1>
              <h4 className={styles.message}>Please select one of the following options:</h4>
              <button onClick={onConnectWithGoogle }>Connect with Google</button>
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