import { UserClassSection } from "./UserClassSection";
import { UserCompletedEvent } from "./UserCompletedEvent"
type User = {
  gid: string;
  name: string,
  completedEvents: UserCompletedEvent[],
  email: string;
  sections: UserClassSection[];
  googleTokens: {
    refresh_token: string;
    access_token: string;
  }
}

export type { User };
