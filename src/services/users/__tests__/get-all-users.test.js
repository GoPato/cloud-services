/* @flow */
import User from '../model'
import getAllUsers from '../get-all-users'
import usersSeed from '../__fixtures__/seed.json'

beforeEach(() => User.setupTable())
afterEach(() => User.teardownTable())

it('should return the list of users', async () => {
  const { users } = await getAllUsers()
  expect(users).toEqual(expect.arrayContaining(usersSeed))
})
