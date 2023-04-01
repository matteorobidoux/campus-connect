import { UserClassSection } from "../UserClassSection";

export type MostRecentMessage = {
  message: string;
  username: string | null;
  room: UserClassSection;
};
