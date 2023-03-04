import { GetAllStrippedCourses } from './../../../types/Queries/Register';
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import CalendarEvents from "../../../types/Calendar"
import { GetAllSectionsRequest, GetAllSectionsResponse } from "../../../types/Queries/GetAllCourses"
import CreateUserBodyParams from "../../../types/Queries/CreateUser"
import { User } from "../../../types/User";
import { getUser } from "./useGoogleOAuth";

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

  return useMutation<unknown, unknown, CreateUserBodyParams>({
    mutationFn: (data) => addUser(data),
    onSuccess: async (data) => {
      console.log('here.');
      await qc.invalidateQueries(['user']);
      debugger;
    }
  })
}

// @deprecated events will be fetched with the section itself.
// This will break very soon.
export const useCalendarEvents = () => {
  async function getCalendarEvents() {
    // Fake a response time
    await new Promise(r => setTimeout(r, 1000));
    const tomorrow = new Date();
    tomorrow.setDate(1);
    const afterTomorrow = new Date();
    afterTomorrow.setDate(2);

    const cEvents: CalendarEvents[] = [
      {
        id: 'ABC',
        date: tomorrow,
        associatedSection: { name: "Web Development" },
        title: 'Submit thingy one',
        description: 'We gotta submit the first sprint demo.',
      },
      {
        id: 'ABD',
        date: afterTomorrow,
        associatedSection: { name: "Software Deployment" },
        title: 'Submit thingy two',
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas"
      }
    ]
    return cEvents;
  }

  return useQuery(['events'], getCalendarEvents, { staleTime: Infinity })
}
