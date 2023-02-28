import { useQuery } from "react-query"
import { Course, ColoredCourse } from "../../../../types/Course"
import { colorVariables } from "../../cssUtils"
import CourseQuickViewContainer from "../CourseQuickViewContainer/CourseQuickViewContainer"
import styles from "./MainSidebar.module.scss"

export default function MainSidebar() {
  const fetchCourse = async (): Promise<ColoredCourse[]> => {
    let promise = new Promise<ColoredCourse[]>((res, rej) => {
      const defaultColor = "salmon"
      let colors = [{ value: defaultColor }]
      // Need to fetch courses here
      const courses: Course[] = [
        {
          title: "Organic Chemistry I",
          number: "202-BZF-05",
          sections: [
            {
              title: "Organic Chemistry I",
              number: "00002",
              teacher: "Carmen Leung",
              schedule: "Tuesday8:30 AM - 10:00 AM3F.7ClassWednesday10:00 AM - 1:00 PM6A.13LabFriday8:30 AM - 10:00 AM3F.7Class"
            }
          ]
        },
        {
          title: "Mise à niveau pour Français, langue seconde de la 5e secondaire",
          number: "602-008-RE",
          sections: [
            {
              title: "Mise à niveau pour Français, langue seconde de la 5e secondaire",
              number: "00031",
              teacher: "Francesca Roy",
              schedule: "Tuesday10:00 AM - 12:00 PM4E.18ClassFriday10:00 AM - 12:00 PM4E.18Class"
            }
          ]
        },
        {
          title: "Linear Algebra",
          number: "201-105-DW",
          sections: [
            {
              title: "Linear Algebra",
              number: "00005",
              teacher: "Gilbert Honnouvo",
              schedule: "Tuesday2:00 PM - 4:00 PM4D.2LabWednesday1:00 PM - 2:30 PM4H.19ClassFriday1:00 PM - 2:30 PM4H.19Class"
            }
          ]
        },
        {
          title: "Organic Chemistry I",
          number: "202-BZF-05",
          sections: [
            {
              title: "Organic Chemistry I",
              number: "00002",
              teacher: "Carmen Leung",
              schedule: "Tuesday8:30 AM - 10:00 AM3F.7ClassWednesday10:00 AM - 1:00 PM6A.13LabFriday8:30 AM - 10:00 AM3F.7Class"
            }
          ]
        },
        {
          title: "Mise à niveau pour Français, langue seconde de la 5e secondaire",
          number: "602-008-RE",
          sections: [
            {
              title: "Mise à niveau pour Français, langue seconde de la 5e secondaire",
              number: "00031",
              teacher: "Francesca Roy",
              schedule: "Tuesday10:00 AM - 12:00 PM4E.18ClassFriday10:00 AM - 12:00 PM4E.18Class"
            }
          ]
        },
        {
          title: "Linear Algebra",
          number: "201-105-DW",
          sections: [
            {
              title: "Linear Algebra",
              number: "00005",
              teacher: "Gilbert Honnouvo",
              schedule: "Tuesday2:00 PM - 4:00 PM4D.2LabWednesday1:00 PM - 2:30 PM4H.19ClassFriday1:00 PM - 2:30 PM4H.19Class"
            }
          ]
        }
      ]
      let coloredCourses = courses as ColoredCourse[]
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
      res(coloredCourses)
    })
    return promise
  }

  const { isLoading, isError, data } = useQuery(
    {
      queryKey: ['sections'],
      queryFn: fetchCourse
    }
  )

  if (isLoading) return <> <span>Loading...</span> </>
  if (isError || data === undefined) return <> <span>Couldn't load data</span> </>

  return (
    <>
      <div className={styles["main-sidebar-container"]}>
        <div className={[styles["sidebar-section"], styles["classes"]].join(" ")}>
          <CourseQuickViewContainer courses={data} />
        </div>
      </div>
    </>
  )
}
