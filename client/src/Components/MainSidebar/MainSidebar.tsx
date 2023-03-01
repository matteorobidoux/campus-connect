import { ColoredSection } from "../../../../types/Section"
import { colorVariables } from "../../cssUtils"
import { useAddUserMutation, useSections } from "../../custom-query-hooks"
import CourseQuickViewContainer from "../CourseQuickViewContainer/CourseQuickViewContainer"
import styles from "./MainSidebar.module.scss"

export default function MainSidebar() {

  const { isLoading, isError, data } = useSections()

  const defaultColor = "salmon"
  let colors = [{ value: defaultColor }]

  useEffect(() => {
    let coloredCourses = data as unknown as ColoredSection[]
    try {
      colors = []
      coloredCourses.map((course) => {
        course.color = colors.pop()?.value || defaultColor;
      })
    } catch (e) {
      coloredCourses.map((course) => {
        course.color = colors[0].value;
      })
    }
  }, [data])


  const addUser = useAddUserMutation();

  if (isLoading) return <> <span>Loading...</span> </>
  if (isError || data === undefined) return <> <span>Couldn't load data</span> </>


  const onSubmit = () => {

    addUser.mutate({
      sections: [{ courseNumber: "530-292-DW", sectionNumber: "00001" }],
      name: "testUser",
      password: "testPasswd",
    })

  }

  return (
    <>
      <div className={styles["main-sidebar-container"]}>
        {/* This is temporary - Marian - 27/02/2023 */}
        <button onClick={() => onSubmit()}> Create testUser </button>
        <div className={[styles["sidebar-section"], styles["classes"]].join(" ")}>
          <CourseQuickViewContainer courses={data} />
        </div>
      </div>
    </>
  )
}

function useEffect(arg0: () => void, arg1: ({ title: string; section: string; teacher: string; schedule: { day: string; startTime: string; endTime: string; classroom: string }[] }[] | undefined)[]) {
  throw new Error("Function not implemented.")
}
