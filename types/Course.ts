import Section from "./Section";

export type Course = {
  title: string;
  number: string;
  sections: Section[];
}

export type ColoredCourse = Course & { color: string }
