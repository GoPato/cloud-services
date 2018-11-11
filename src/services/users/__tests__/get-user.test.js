/* @flow */
import User from '../model'
import getUser from '../get-user'
import usersSeed from '../__fixtures__/seed.json'

beforeEach(() => User.setupTable())
afterEach(() => User.teardownTable())

it('should return the requested user', async () => {
  const { userId } = usersSeed[0]
  const { user } = await getUser({ userId })
  expect(await User.get({ userId })).toEqual(user)
})
