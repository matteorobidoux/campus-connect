import { UserClassSection } from "./UserClassSection";
import { UserCompletedEvent } from "./UserCompletedEvent"
type User = {
  name: string,
  password: string,
  completedEvents: UserCompletedEvent[],
  sections: UserClassSection[];
}

export { User };
