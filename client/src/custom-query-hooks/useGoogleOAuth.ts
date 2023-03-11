import axios from "axios";
import { useQuery } from "react-query";
import { GAuthResponse } from "../../../types/Queries/GAuth";
import { User } from "../../../types/User";

export const getUser = () => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!): undefined;
export const writeUser = (user: User) => window.localStorage.setItem('user', JSON.stringify(user));

const useGoogleOAuth = () => {
  const getter = async () => {
    const user = getUser();
    console.log('found user.');
    if (user) {
      return user;
    }

    if (document.documentURI.includes("code")) {
      const { data } = await axios.get<GAuthResponse>("/gauth?" + document.documentURI.split('?')[1]);     
      
      if (data.user) {
        console.log("Logged in with user", data.user);
        writeUser(data.user);
        return data.user;
      }

      if (data.registerInfo) {
        console.log("Should move to registration", data.user);
        return data.registerInfo;
      }

      if (data.error) {
        console.error(data.error);
        return;
      }

      return data;
    }
    return;
  }

  return useQuery(['user'], getter, { staleTime: Infinity, retry: false })
}

export { useGoogleOAuth };
