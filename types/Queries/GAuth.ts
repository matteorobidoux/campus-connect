import { User } from '../User';

export type RegisterInfo = {
  gid: string,
  email: string,
  picture: string,
  refresh_token: string,
  access_token: string,
  family_name: string,
  given_name: string
}

export type GAuthResponse = {
  user?: (User & {id : string});
  registerInfo?: RegisterInfo;
  error? : string;
}
