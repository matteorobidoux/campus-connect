class Events {
  id: String;
  title: String;
  deadline: Date;
  desc: String;
  associatedSection: {
    name: String
  };
  constructor(id: String, theTtitle :String, theDealine: Date, theDesc: String, sectionName: String){
    this.title=theTtitle;
    this.deadline= theDealine;
    this.desc= theDesc;
    this.associatedSection.name= sectionName
  }

  deadLine(){
    return this.deadLine
  }
  description(){
    return this.desc
  }
  eventTitle(){
    return this.title
  }
  associatedSec(){
    return this.associatedSection.name
  }
}

export default Events;