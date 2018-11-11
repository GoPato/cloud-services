/* @flow */
import User from '../model'
import createUser from '../create-user'

beforeEach(() => User.setupTable())
afterEach(() => User.teardownTable())

it('should create a new user', async () => {
  const event = {
    request: {
      userAttributes: {
        sub: 'user-4',
        email: 'blackwidow@avengers.io',
        phone_number: '+50680000004',
        'custom:first_name': 'Natasha',
        'custom:last_name': 'Romanoff',
      },
    },
  }

  const callback = jest.fn()
  const { user } = await createUser(event, null, callback)

  expect(user).toEqual({
    userId: 'user-4',
    email: 'blackwidow@avengers.io',
    phone: '+50680000004',
    firstName: 'Natasha',
    lastName: 'Romanoff',
  })
  expect(await User.get({ userId: user.userId })).toEqual(user)
  expect(callback).toHaveBeenCalledWith(null, event)
})
