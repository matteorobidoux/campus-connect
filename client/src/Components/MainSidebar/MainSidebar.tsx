import { useAddUserMutataion } from "../../custom-query-hooks"
import styles from "./MainSidebar.module.scss"

export default function MainSidebar() {
  const addUser = useAddUserMutataion();

  const onSubmit = () => {

    addUser.mutate({
      sections: [{courseNumber: "530-292-DW", sectionNumber: "00001"}],
      name: "testUser",
      password: "testPasswd",
    })

  }

  return (
    <div className={styles["main-sidebar-container"]}>
      <button onClick={() => onSubmit()}> Create testUser </button>
      <p>Main sidebar</p>
    </div>
  )
}
