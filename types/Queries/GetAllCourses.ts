import { UserClassSection } from "../UserClassSection";
type GetAllSectionsResponse = {
  title: string;
  sections: {
    teacher: string;
    number: string;
  }[];
  id: string;
}[]

type GetAllSectionsRequest = {
  userClassSections: UserClassSection[]
}

export {GetAllSectionsRequest, GetAllSectionsResponse} ;
