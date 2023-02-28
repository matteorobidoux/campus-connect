import { UserClassSection } from "./UserClassSection";

type User = {
  name: string,
  email: string;
  password: string,
  sections: UserClassSection[];
}

export { User };
