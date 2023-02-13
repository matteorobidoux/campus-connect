import './App.css';
import Calendar from './Calendar';
import CalendarEvent from "../../types/Calendar"
import { useState } from 'react';
import CalendarEventRow from './CalendarEntry';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([])

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Calendar onMonthChanged={(_, evs)=> setEvents(evs)}/>
        <div style={{width: "250px"}}>
          {events.map(ev => <CalendarEventRow event={ev} key={ev.id}/>)}
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
