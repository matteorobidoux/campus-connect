import Schedule from "./Schedule";
import  EventSchema from "../server/src/db/models/event-schema";
export type Section = {
  schedule: Schedule[];
  teacher: string;
  number: string;
  events: Array<EventSchema.schema>;
  students: string[]
}

export type StrippedSection = {
  teacher: string;
  number: string;
}