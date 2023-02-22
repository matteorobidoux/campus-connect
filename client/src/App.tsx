import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import Main from './Components/Main/Main';
import MainSidebar from './Components/MainSidebar/MainSidebar';
import NavBar from './Components/NavBar/NavBar';
import ProfileBar from './Components/ProfileBar/ProfileBar';
import Course from "../../types/Course"

const queryClient = new QueryClient()
library.add(faCircleNotch)

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  // TODO: what should the type of e be?
  function openProfileBar() {
    setIsOpen(!isOpen)
  }

  // Temporary
  // TODO: replace with useQuery hook
  const courses: Course[] = [
    {
      sectionTitle: "Software Development",
      sectionNumber: 2,
      teacherName: "John Doe",
      color: "red", // color random from css root
    }, {
      sectionTitle: "Chemistry",
      sectionNumber: 3,
      teacherName: "Walter White",
      color: "green" // color random from css root
    }, {
      sectionTitle: "English Litterature",
      sectionNumber: 5,
      teacherName: "William Shakespeare",
      color: "blue" // color random from css root
    }
  ]

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <div className="app-container">
        <NavBar toggleSidebar={openProfileBar} />
        <div className="app-content-container">
          <MainSidebar courses={courses} />
          <Main />
        </div>
        <ProfileBar isOpen={isOpen} toggleFunc={openProfileBar} />
      </div>
    </QueryClientProvider>
  );
}
