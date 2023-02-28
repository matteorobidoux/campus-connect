import { useQuery } from "react-query"
import { Course, ColoredCourse } from "../../../../types/Course"
import { colorVariables } from "../../cssUtils"
import { useAddUserMutation } from "../../custom-query-hooks"
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
              events: [],
              number: "00002",
              teacher: "Carmen Leung",
              schedule: [
                {
                  day: "Monday",
                  begin: "8:30",
                  end: "10:00",
                  duration: {
                    hours: 1,
                    minutes: 30
                  }
                },
                {
                  day: "Wednesday",
                  begin: "8:30",
                  end: "10:00",
                  duration: {
                    hours: 1,
                    minutes: 30
                  }
                }
              ],
              students: []
            }
          ]
        },
        {
          title: "Mise à niveau pour Français, langue seconde de la 5e secondaire",
          number: "602-008-RE",
          sections: [
            {
              events: [],
              number: "00031",
              teacher: "Francesca Roy",
              schedule: [
                {
                  day: "Monday",
                  begin: "8:30",
                  end: "10:00",
                  duration: {
                    hours: 1,
                    minutes: 30
                  }
                },
                {
                  day: "Wednesday",
                  begin: "8:30",
                  end: "10:00",
                  duration: {
                    hours: 1,
                    minutes: 30
                  }
                }
              ],
              students: []
            }
          ]
        },
        {
          title: "Linear Algebra",
          number: "201-105-DW",
          sections: [
            {
              events: [],
              number: "00005",
              teacher: "Gilbert Honnouvo",
              schedule: [
                {
                  day: "Monday",
                  begin: "8:30",
                  end: "10:00",
                  duration: {
                    hours: 1,
                    minutes: 30
                  }
                },
                {
                  day: "Wednesday",
                  begin: "8:30",
                  end: "10:00",
                  duration: {
                    hours: 1,
                    minutes: 30
                  }
                }
              ],
              students: []
            }
          ]
        },
        {
          title: "Organic Chemistry I",
          number: "202-BZF-05",
          sections: [
            {
              events: [],
              number: "00002",
              teacher: "Carmen Leung",
              schedule: [
                {
                  day: "Monday",
                  begin: "8:30",
                  end: "10:00",
                  duration: {
                    hours: 1,
                    minutes: 30
                  }
                },
                {
                  day: "Wednesday",
                  begin: "8:30",
                  end: "10:00",
                  duration: {
                    hours: 1,
                    minutes: 30
                  }
                }
              ],
              students: []
            }
          ]
        },
        {
          title: "Mise à niveau pour Français, langue seconde de la 5e secondaire",
          number: "602-008-RE",
          sections: [
            {
              events: [],
              number: "00031",
              teacher: "Francesca Roy",
              schedule: [
                {
                  day: "Monday",
                  begin: "8:30",
                  end: "10:00",
                  duration: {
                    hours: 1,
                    minutes: 30
                  }
                },
                {
                  day: "Wednesday",
                  begin: "8:30",
                  end: "10:00",
                  duration: {
                    hours: 1,
                    minutes: 30
                  }
                }
              ],
              students: []
            }
          ]
        },
        {
          title: "Linear Algebra",
          number: "201-105-DW",
          sections: [
            {
              events: [],
              number: "00005",
              teacher: "Gilbert Honnouvo",
              schedule: [
                {
                  day: "Monday",
                  begin: "8:30",
                  end: "10:00",
                  duration: {
                    hours: 1,
                    minutes: 30
                  }
                },
                {
                  day: "Wednesday",
                  begin: "8:30",
                  end: "10:00",
                  duration: {
                    hours: 1,
                    minutes: 30
                  }
                }
              ],
              students: []
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
        <div className={styles["sidebar-section"]}>
          <button onClick={() => onSubmit()}> Create testUser </button>
        </div>
        <div className={[styles["sidebar-section"], styles["classes"]].join(" ")}>
          <CourseQuickViewContainer courses={data} />
        </div>
      </div>
    </>
  )
}