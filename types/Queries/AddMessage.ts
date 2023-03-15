import { UserClassSection } from "../UserClassSection";
import { UserMessage } from "../MessageUser"; 

type AddMessage = {
    room: UserClassSection;
    message: UserMessage;
}

export type {AddMessage};
