import Schedule from "./Schedule";
<<<<<<< HEAD
=======
import {Events} from "./Event";
>>>>>>> 59e62a7a3128af36884ad41cd32089c7de9eed04
export type Section = {
  schedule: Schedule[];
  teacher: string;
  number: string;
  events: Array<any>;
  students: string[]
}

export type StrippedSection = {
  teacher: string;
  number: string;
}