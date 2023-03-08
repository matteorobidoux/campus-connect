import { Section } from "./Section"

type UserClass = {
  courseNumber: string;
  courseTitle: string;
} & Section;

export type { UserClass };
