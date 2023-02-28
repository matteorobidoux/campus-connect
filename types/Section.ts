import Schedule from "./Schedule";
import Events from "./Event";
type Section = {
  schedule: Schedule[];
  teacher: string;
  number: string;
  events: Events[];
  students:string[]
}

export default Section;
