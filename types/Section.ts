import Schedule from "./Schedule";
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