import { FormEvent, useState } from "react"
import styles from "./Login.module.scss"
import CourseEntryWidget from "../CourseEntryWidget/CourseEntryWidget"
import { useTranslation } from "react-i18next"
import { validateStringLengthRange } from "../../validationUtils"

type NamesFormEvent = FormEvent<HTMLFormElement> & {
  target: & {
    elements: {
      firstName: {
        value: any
      },
      lastName: {
        value: any
      }
    }
  }
}

type PersonName = {
  firstName: string,
  lastName: string
}

export default function Login() {
  const [firstLogin, setFirstLogin] = useState<boolean>(false)
  const [isNameValid, setIsNameValid] = useState<boolean>(false)
  const [isNameEntered, setIsNameEntered] = useState<boolean>(false)
  const [name, setName] = useState<PersonName>()

  const validateNames = (e: NamesFormEvent) => {
    const firstName = e.target.elements.firstName.value
    const lastName = e.target.elements.lastName.value
    const isValid = validateStringLengthRange(firstName, 2, 100) || validateStringLengthRange(lastName, 2, 100)
    setIsNameValid(isValid)
    setIsNameEntered(isValid)
    if (isValid) {
      setName({
        firstName: firstName,
        lastName: lastName
      })
    }
  }

  const { t, i18n } = useTranslation(["login"]);

  const onConnectWithGoogle = () => {
    fetch('/api/authenticate').then(async r => {
      const k = await r.json();
      console.log(k.authorizationUrl);
      window.location.href = k.authorizationUrl;
    })
  }

  return (
    <div className={styles["login-container"]}>
      <div className={styles["options-menu"]}>
        {!firstLogin ?
          <>
            <h1 className={styles.title}>{t("welcome")}</h1>
            <h4 className={styles.message}>{t("selectOption")}</h4>
            <button onClick={onConnectWithGoogle}>{t("connect")}</button>
          </> :
          !isNameValid && !isNameEntered ?
            <>
              <h4 className={styles.message}>Please fill the following form:</h4>
              {
                !isNameValid && isNameEntered ?
                  <h5 className={styles["form-error"]}>Both names must be between 2 and 100 characters</h5>
                  : null
              }
              <form className={styles["name-form"]} onSubmit={(e: NamesFormEvent) => {
                e.preventDefault()
                validateNames(e)
              }}>
                <label htmlFor="firstName">Enter your first name:</label>
                <input type="text" id="firstName" name="firstName" />
                <label htmlFor="lastName">Enter your last name:</label>
                <input type="text" id="lastName" name="lastName" />
                <button type="submit" onClick={(e) => {
                  e.stopPropagation()
                }}>Continue</button>
              </form>
            </>
            :
            <CourseEntryWidget />
        }
      </div>
    </div>
  )
}