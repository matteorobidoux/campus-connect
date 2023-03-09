import { UserClassSection } from "../UserClassSection";
import { Events } from "../Event"; 

type AddEventBody = {
    section: UserClassSection;
    event: Omit<Events, '_id'>;
}

type AddEventResponse = {
    success: boolean;
}

export type {AddEventBody, AddEventResponse};
