import UserSection from "../Usersection"

type CreateUserBodyParams = {
  nameUser: string,
  passwd: string,
  classes: string[],
  sectionsuser: UserSection[]
}

export default CreateUserBodyParams;

