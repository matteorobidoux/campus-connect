const mockingoose = require("mockingoose");
import User from '../db/models/user-schema'


describe('test mongoose User model', () => {
  it('should return the doc with findById', () => {
    const _doc = {
      name: 'nameOb',
      completedEvents: [],
      sections: [],
      email:"",
      gid: "",
      googleTokens: {}
    };

    mockingoose(User).toReturn(_doc, 'findOne');

    return User.findById({name: 'nameOb' }).then(doc => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });

  
});