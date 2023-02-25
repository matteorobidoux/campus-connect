import { randomUUID } from "crypto";
import { useMutation } from "react-query"
import { useAddUserMutataion } from "../../custom-query-hooks"
import styles from "./MainSidebar.module.scss"

export default function MainSidebar() {
  const addUser = useAddUserMutataion();

  const onSubmit = () => {

    addUser.mutate({
      sectionsuser: [{coursenumber: "530-292-DW", sectionnumber: "00001"}],
      classes: [], // TODO remove this
      nameUser: "testUser",
      passwd: "testPasswd"
    })

  }

  return (
    <div className={styles["main-sidebar-container"]}>
      <button onClick={() => onSubmit()}> Create testUser </button>
      <p>Main sidebar</p>
    </div>
  )
}
