import { GetAllStrippedCourses } from './../../../types/Queries/Register';
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { GetAllSectionsRequest, GetAllSectionsResponse } from "../../../types/Queries/GetAllCourses"
import CreateUserBodyParams from "../../../types/Queries/CreateUser"
import { User } from "../../../types/User";
import { getUser, writeUser } from "./useGoogleOAuth";

export function useUser() {
  let user = getUser() as ((User & {_id: string}) | undefined);
  if (!user) {
    console.warn("Be alert that calling useUser without the user being logged in will result in side effects!");
  }
  return user!;
}

export const useSections = (classes: GetAllSectionsRequest) => {
  async function queryFunction(params: GetAllSectionsRequest) {
    const data = await axios.get<GetAllSectionsResponse>('/api/getAllSections', { params });
    return data.data;
  }

  return useQuery<GetAllSectionsResponse>(
    ['getAllCourses', {...classes.userClassSections}],
    () => queryFunction(classes), { staleTime: Infinity });
}

export const useCourseInfo = () => {
  async function queryFunction() {
    const data = await axios.get<GetAllStrippedCourses>('/api/getAllStrippedCourses')
    return data.data
  }

  return useQuery<GetAllStrippedCourses>(['getAllStrippedCourses'], () => queryFunction(), { staleTime: Infinity })
}

export const useAddUserMutation = () => {
  async function addUser(body: CreateUserBodyParams) {
    const resp = await axios.post('/api/addUser', body);
    return resp.data;
  }

  const qc = useQueryClient();

  return useMutation<User, unknown, CreateUserBodyParams>({
    mutationFn: (data) => addUser(data),
    onSuccess: async (data) => {
      writeUser(data)
      await qc.invalidateQueries({queryKey: ['user']});
      await qc.refetchQueries({queryKey: ['user']});
    }
  })
}

// @deprecated events will be fetched with the section itself.
// This will break very soon.
export const useCalendarEvents = () => {
  const user = useUser();
  const { isLoading, data, isStale }= useSections({ userClassSections: user.sections} );

  let events = data?.flatMap(s => s.events) ?? [];
  console.log(events);
  events = events.map(ev => ({...ev, date: new Date(ev.date), _id:ev._id}) );

  return { isLoading, data: events, isStale }

}
