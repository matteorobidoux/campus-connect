import {UserClassSection} from "../UserClassSection"

type CreateUserBodyParams = {
  gid: string;
  email: string;
  name: string,
  sections: UserClassSection[]
  googleTokens: {
    refresh_token: string;
    access_token: string;
  }
}

export default CreateUserBodyParams;

