import {UserClassSection} from "../UserClassSection"

type CreateUserBodyParams = {
  name: string,
  password: string,
  sections: UserClassSection[]
}

export default CreateUserBodyParams;

