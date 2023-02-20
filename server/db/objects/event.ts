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

export default Events;