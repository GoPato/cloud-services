/* @flow */
import User from '../model'
import updateUser from '../update-user'
import usersSeed from '../__fixtures__/seed.json'

beforeEach(() => User.setupTable())
afterEach(() => User.teardownTable())

it('should update the requested user', async () => {
  const { userId } = usersSeed[0]

  const { user } = await updateUser({
    userId,
    user: {
      firstName: 'Updated!',
    },
  })

  expect(await User.get({ userId })).toEqual(user)
})
