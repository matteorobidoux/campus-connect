import { UserCompletedEvent } from "../UserCompletedEvent";
type CompletedEventBodyParams = {
  userId: string;
  completedEvent: UserCompletedEvent;
};

export default CompletedEventBodyParams;
