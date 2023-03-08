
const request = require('supertest')
import {app} from '../app'
jest.mock('../db/db.ts')

afterAll( async () =>{
  app.listen().close()
})
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
    // mydb.get = jest.fn().mockResolvedValue({
    //   data: [
    //     {
    //       name: 'nameOb',
    //       completedEvents: [],
    //       sections: [],
    //       email: "",
    //       gid: "",
    //       googleTokens: {}
    //     }
    //   ]
    // });
    const res= await request(app).get("/users")
    expect(res.body).toBeDefined()
  });
});