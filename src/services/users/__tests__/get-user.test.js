/* @flow */
import User from '../model'
import getUser from '../get-user'
import usersSeed from '../__fixtures__/seed.json'

beforeEach(() => User.setupTable())
afterEach(() => User.teardownTable())

it('should return the requested user', async () => {
  const testUser = usersSeed[0]
  const { userId } = testUser
  const { user } = await getUser({ userId })
  expect(user).toEqual(testUser)
})
