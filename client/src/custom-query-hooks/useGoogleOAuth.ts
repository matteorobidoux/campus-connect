import axios from "axios";
import { useQuery } from "react-query";
import { GAuthResponse } from "../../../types/Queries/GAuth";

const getUser = () => JSON.parse(localStorage.getItem('user') ?? "false") ;

const useGoogleOAuth = () => {
  const getter = async () => {
    const user = getUser();
    if (user != false) {
      alert("internal")
      console.log(user);
      return user;
    }

    if (document.documentURI.includes("/gauth")) {
      const { data } = await axios.get<GAuthResponse>(document.documentURI);
      
      if (data.user) {
        console.log("Logged in with user", data.user);
        window.localStorage.setItem('user', JSON.stringify(data.user));
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

  return useQuery(['googleOAuth'], getter, { staleTime: Infinity, retry: false })
}

export { useGoogleOAuth };
