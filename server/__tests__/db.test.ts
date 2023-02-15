const mockingoose = require('mockingoose');
const user= require('../db/models/user-schema')


describe('test mongoose User model', () => {
  it('should return the doc with findById', () => {
    const _doc = {
      _id: '507f191e810c19729de860ea',
      name: 'name',
      email: 'name@email.com',
    };

    mockingoose(user).toReturn(_doc, 'findOne');

    return user.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });


});