import { UserClassSection } from "../UserClassSection";
import { UserClass } from "../UserClass";

type GetAllSectionsResponse = {
  response: UserClass[]
}

type GetAllSectionsRequest = {
  userClassSections: UserClassSection[]
}

export type { GetAllSectionsRequest, GetAllSectionsResponse };
