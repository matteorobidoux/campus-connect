import { Events } from "./Event";
import Schedule from "./Schedule";
export type Section = {
  schedule: Schedule[];
  teacher: string;
  number: string;
  events: Array<Events>;
  students: string[];
};

export type StrippedSection = {
  teacher: string;
  number: string;
};
