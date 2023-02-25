import Schedule from "./Schedule";
import Events from "./Eventsection"
type Section = {
  schedule: Schedule[];
  teacher: string;
  number: string;
  events: Events[];
  students:string[]
}

export default Section;
