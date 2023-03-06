const mydb = require('../db/db.ts')

jest.mock('../db/db.ts')




describe('test mongoose User model', () => {
  it('should return the doc with findById', async () => {
    // mydb.getAllUsers.mockResolvedValue({
    //   data:[
    //     {
    //       a:"e"
    //     }
    //   ]
    // })
    // const test= await mydb.getAllUsers()
    mydb.get = jest.fn().mockResolvedValue({
      data: [
        {
          name: 'nameOb',
          completedEvents: [],
          sections: [],
          email: "",
          gid: "",
          googleTokens: {}
        }
      ]
    });

    expect(mydb.get).toHaveBeenCalledTimes(1)

  });


});