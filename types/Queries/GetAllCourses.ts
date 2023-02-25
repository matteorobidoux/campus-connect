type GetAllCoursesResponse = {
  title: string;
  sections: {
    teacher: string;
    number: string;
  }[];
  id: string;
}[]

export default GetAllCoursesResponse;
