import Schedule from "../../../../types/Schedule";

export interface TimeslotProps {
  schedule: Schedule;
}

export function Timeslot({schedule}: TimeslotProps) {
  return <div>
    <h5> { schedule.day } </h5>
    <p> { schedule.begin } - { schedule.end } </p>
  </div>
}
