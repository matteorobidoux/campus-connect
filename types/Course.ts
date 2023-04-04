import { Section, StrippedSection } from "./Section";

export type Course = {
  title: string;
  number: string;
  sections: Section[];
};

export type StrippedCourse = {
  title: string;
  number: string;
  sections: StrippedSection[];
};
