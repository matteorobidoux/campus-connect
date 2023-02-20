type AssociatedSection ={
  name:string
}

interface Events{
id: string;
title:string;
deadline: Date;
desc: string;
associatedSect: AssociatedSection;
}

const eve:Events = {
  id:"a",
  title:"as",
  deadline: new Date(),
  desc:"as",
  associatedSect:{name:"a"}
}


export default Events;