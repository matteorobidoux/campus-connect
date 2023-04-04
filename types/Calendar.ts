export default interface CalendarEvent {
  // Here we want to assume a complex date... Mongoose will probably give us some weird data format
  // And this is what we will use
  id: string;
  date: Date;
  title: string;
  description: string;

  associatedSection: {
    name: string;
  };
}
