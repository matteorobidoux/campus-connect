import { UserClassSection } from "../UserClassSection";

export type MostRecentMessage = {
  message: string;
  userName: string | null;
  room: UserClassSection;
};
