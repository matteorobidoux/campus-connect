class AutoIncrement{
 static  _id: number=0
  id: number;
  constructor(){
    this.id= AutoIncrement._id++;
  }
  toGetId(){
    return ""+this.id;
  }
}

export default  AutoIncrement;