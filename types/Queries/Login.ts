import { User } from "../User";

type LoginRequest = {
  name: string;
  password: string;
};

type LoginResponse = {
  data: User | null;
};

export { LoginRequest, LoginResponse };
