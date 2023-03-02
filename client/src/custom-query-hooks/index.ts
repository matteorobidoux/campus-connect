import axios from "axios";
import { useMutation, useQuery } from "react-query";
import CalendarEvents from "../../../types/Calendar"
import { GetAllSectionsRequest, GetAllSectionsResponse} from "../../../types/Queries/GetAllCourses"
import CreateUserBodyParams from "../../../types/Queries/CreateUser"

export const useGetAllSections = (classes: GetAllSectionsRequest) => {
  async function queryFunction(params: GetAllSectionsRequest) {
    const data = await axios.get<GetAllSectionsResponse>('/api/getAllSections', {params});
    return data.data;
  } 

  return useQuery<GetAllSectionsResponse>(['getAllCourses', classes], () => queryFunction(classes), {staleTime: Infinity});
}

export const useAddUserMutataion = () => {
  async function addUser(body: CreateUserBodyParams) {
    const resp = await axios.post('/api/addUser', body);
    return resp.data;
  }

  return useMutation<unknown, unknown, CreateUserBodyParams>({
    mutationFn: (data) => addUser(data),
    onSuccess: (data) => console.log(data)
  })
}

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
        associatedSection: { name: "Web Development" } ,
        title: 'Submit thingy one',
        description: 'We gotta submit the first sprint demo.',
      },
      {
        id: 'ABD',
        date: afterTomorrow,
        associatedSection: { name: "Software Deployment" } ,
        title: 'Submit thingy two',
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas"
      }
    ]
    return cEvents;
  }

  return useQuery(['events'], getCalendarEvents, {staleTime: Infinity})
}