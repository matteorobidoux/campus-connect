class Events {
  name: String;
  deadline: Date;
  desc: String;

  constructor(theName :String, theDealine: Date, theDesc: String){
    this.name=theName;
    this.deadline= theDealine;
    this.desc= theDesc;
  }

  deadLine(){
    return this.deadLine
  }
  description(){
    return this.desc
  }
  eventName(){
    return this.name
  }
}

export default Events;