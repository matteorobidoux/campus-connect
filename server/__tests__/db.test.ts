const mockingoose = require("mockingoose");
import User from '../db/models/user-schema'


describe('test mongoose User model', () => {
  it('should return the doc with findById', () => {
    const _doc = {
      name: 'nameOb',
      password: 'name123',
      class: ["class1", "class2"]
    };

    mockingoose(User).toReturn(_doc, 'findOne');

    return User.findById({name: 'nameOb' }).then(doc => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });

  
});