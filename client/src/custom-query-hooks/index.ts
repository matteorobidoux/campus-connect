import { GetAllStrippedCourses } from "./../../../types/Queries/Register";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  GetAllSectionsRequest,
  GetAllSectionsResponse,
} from "../../../types/Queries/GetAllCourses";
import CreateUserBodyParams from "../../../types/Queries/CreateUser";
import { User } from "../../../types/User";
import { getUser, writeUser } from "./useGoogleOAuth";

export function useUser() {
  function queryFunction() {
    console.log("re-funning user");
    let user = getUser() as (User & { _id: string }) | undefined;
    if (!user) {
      console.warn(
        "Be alert that calling useUser without the user being logged in will result in side effects!"
      );
    }
    return user!;
  }
  const uq = useQuery("user", queryFunction, { staleTime: Infinity });

  return uq.data!;
}

export function useUpdateUser(gid: string) {
  const queryClient = useQueryClient();
  async function queryFunction() {
    const user = await axios.get<{ user: User }>("/api/getUserInfo", {
      params: { gid },
    });
    if (user.data.user) {
      console.log("Updating user.");
      writeUser(user.data.user);
    }
    return user.data;
  }

  useQuery(["userUpdate", gid], queryFunction, {
    cacheTime: Infinity,
    staleTime: Infinity,
    onSuccess: () => queryClient.invalidateQueries("user"),
  });
}

export const useSections = (classes: GetAllSectionsRequest) => {
  async function queryFunction(params: GetAllSectionsRequest) {
    const data = await axios.get<GetAllSectionsResponse>(
      "/api/getAllSections",
      { params }
    );

    return data.data.map((uc) => ({
      ...uc,
      events: uc.events.map((ev) => ({ ...ev, date: new Date(ev.date) })),
    }));
  }

  return useQuery<GetAllSectionsResponse>(
    ["getAllCourses"],
    () => queryFunction(classes),
    { staleTime: Infinity }
  );
};

export const useCourseInfo = () => {
  async function queryFunction() {
    const data = await axios.get<GetAllStrippedCourses>(
      "/api/getAllStrippedCourses"
    );
    return data.data;
  }

  return useQuery<GetAllStrippedCourses>(
    ["getAllStrippedCourses"],
    () => queryFunction(),
    { staleTime: Infinity }
  );
};

export const useAddUserMutation = () => {
  async function addUser(body: CreateUserBodyParams) {
    const resp = await axios.post("/api/addUser", body);
    return resp.data;
  }

  const qc = useQueryClient();

  return useMutation<User, unknown, CreateUserBodyParams>({
    mutationFn: (data) => addUser(data),
    onSuccess: async (data) => {
      writeUser(data);
      await qc.invalidateQueries({ queryKey: ["userUpdate", data.gid] });
      await qc.invalidateQueries({ queryKey: ["user"] });
      await qc.refetchQueries({ queryKey: ["userUpdate", data.gid] });
    },
  });
};

// @deprecated events will be fetched with the section itself.
// This will break very soon.
export const useCalendarEvents = () => {
  const user = useUser();
  const { isLoading, data, isStale } = useSections({
    userClassSections: user.sections,
  });

  let events = data?.flatMap((s) => s.events) ?? [];
  events = events.map((ev) => ({
    ...ev,
    date: new Date(ev.date),
    _id: ev._id,
  }));

  return { isLoading, data: events, isStale };
};
