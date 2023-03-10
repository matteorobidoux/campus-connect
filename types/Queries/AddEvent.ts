import { UserClassSection } from "../UserClassSection";
import { Events } from "../Event"; 

type AddEventBody = {
    section: UserClassSection;
    event: Events;
}

type AddEventResponse = {
    success: boolean;
}

export type {AddEventBody, AddEventResponse};
