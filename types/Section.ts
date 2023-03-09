import Schedule from "./Schedule";
import {Events} from "./Event";
export type Section = {
  schedule: Schedule[];
  teacher: string;
  number: string;
  events: Events[];
  students: string[]
}

export type StrippedSection = {
  teacher: string;
  number: string;
}