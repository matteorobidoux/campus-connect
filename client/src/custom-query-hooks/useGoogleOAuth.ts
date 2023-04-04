import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { GAuthResponse } from "../../../types/Queries/GAuth";
import { User } from "../../../types/User";

export const getUser = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : undefined;

export const writeUser = (user: User) =>
  window.localStorage.setItem("user", JSON.stringify(user));
export const removeUser = () => window.localStorage.removeItem("user");

const useGoogleOAuth = () => {
  const queryClient = useQueryClient();
  const getter = async () => {
    const user = getUser();
    if (user) {
      return user;
    }

    if (document.documentURI.includes("code")) {
      const { data } = await axios.get<GAuthResponse>(
        "/gauth?" + document.documentURI.split("?")[1]
      );

      console.log(data);

      if (data.user) {
        console.log("Logged in with user", data.user);
        writeUser(data.user);
        queryClient.invalidateQueries("user");
        return data.user;
      }

      if (data.registerInfo) {
        console.log("Should move to registration", data.registerInfo);
        return data.registerInfo;
      }

      if (data.error) {
        console.error(data.error);
        return;
      }

      return data;
    }
    // Error is still thrown and shown in the console.
    // The absence of data is still handled
    throw new Error("Not returning from GAuth");
  };

  return useQuery(["usergauth"], getter, {
    staleTime: Infinity,
    retry: false,
  });
};

export { useGoogleOAuth };
