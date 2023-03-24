import { UserClassSection } from "../UserClassSection";
import { UserClass } from "../UserClass";

type GetAllSectionsResponse = UserClass[];

type GetAllSectionsRequest = {
  userClassSections: UserClassSection[];
};

export type { GetAllSectionsRequest, GetAllSectionsResponse };
