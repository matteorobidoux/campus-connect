import { CalendarWidget } from "../CalendarWidget"
import styles from "./Main.module.scss"
import { useEffect } from "react";
import { useGetAllSections } from "../../custom-query-hooks";


export default function Main() {
  const query = useGetAllSections({userClassSections: [
    {
      courseNumber: "574-251-DW",
      sectionNumber: "00001",
    }
  ]});

  useEffect(() => {
    console.log(query.data)
  }, [query.data])

  return (
    <div className={styles["main-content-container"]}>
      <CalendarWidget />
    </div>
  )
}
