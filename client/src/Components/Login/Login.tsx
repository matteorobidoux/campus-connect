import { useState } from "react"
import styles from "./Login.module.scss"
import CourseEntryWidget from "../CourseEntryWidget/CourseEntryWidget"

export default function Login() {
  const [firstLogin, setFirstLogin] = useState(false)

  return (
    <div className={styles["login-container"]}>
      <div className={styles["background-image-filter"]}>
        <div className={styles["options-menu"]}>
          {!firstLogin ?
            <>
              <h1 className={styles.title}>Welcome to Campus Connect</h1>
              <h4 className={styles.message}>Please select one of the following options:</h4>
              <button onClick={() => { setFirstLogin(true) }}>Connect with Google</button>
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