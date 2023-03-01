import { UserClassSection } from "./UserClassSection";

type User = {
  gid: string;
  name: string,
  email: string;
  sections: UserClassSection[];
  googleTokens: {
    refresh_token: string;
    access_token: string;
  }
}

export { User };
