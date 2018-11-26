/* @flow */
import User from '../model'
import updateUser from '../update-user'
import usersSeed from '../__fixtures__/seed.json'

beforeEach(() => User.setupTable())
afterEach(() => User.teardownTable())

it('should update the requested user', async () => {
  const testUser = usersSeed[0]
  const { userId } = testUser

  const updateData = {
    firstName: 'new firstname',
    lastName: 'new lastname',
    birthday: '1994-07-17',
  }

  const { user } = await updateUser({
    userId,
    user: updateData,
  })

  expect(user).toEqual({
    ...testUser,
    ...updateData,
    profileCompleteness: expect.any(Number),
  })
})
