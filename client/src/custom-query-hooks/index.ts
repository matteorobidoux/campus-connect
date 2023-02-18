import { useQuery } from "react-query";
import CalendarEvents from "../../../types/Calendar"

export const useCalendarEvents = () => {
  async function getCalendarEvents() {
    // Fake a response time
    await new Promise(r => setTimeout(r, 1000));
    const tomorrow = new Date();
    tomorrow.setDate(1);
    const afterTomorrow = new Date();
    afterTomorrow.setDate(2);

    const cEvents: CalendarEvents[] = [
      {
        id: 'ABC',
        date: tomorrow,
        associatedSection: { name: "Web Development" } ,
        title: 'Submit thingy one',
        description: 'We gotta submit the first sprint demo.',
      },
      {
        id: 'ABD',
        date: afterTomorrow,
        associatedSection: { name: "Software Deployment" } ,
        title: 'Submit thingy two',
        description: 'Description two'
      }
    ]
    return cEvents;
  }

  return useQuery(['events'], getCalendarEvents)
}

export const useSections = () => {
  const getClasses = async () => {
    await new Promise(r => setTimeout(r, 1000));
    const classes = [{
      title: "Web Development",
      section: "00001",
      teacher: "Daniel Pomerantz",
      schedule: [{
        day: "Monday",
        startTime: "4:00 PM",
        endTime: "6:00 PM",
        classroom: "3E.7"
      }, {
          day: "Wednesday",
          startTime: "4:00 PM",
          endTime: "6:00 PM",
          classroom: "3E.7"
        }
      ]},
      {
        title: "Software Development",
        section: "00001",
        teacher: "Maya Sspogjas",
        schedule: [{
          day: "Monday",
          startTime: "4:00 PM",
          endTime: "6:00 PM",
          classroom: "3E.7"
        }, {
            day: "Wednesday",
            startTime: "4:00 PM",
            endTime: "6:00 PM",
            classroom: "3E.7"
          }
        ]},
    ]
    return classes;
  }
  return useQuery(['sections'], getClasses)
}
