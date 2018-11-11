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
        name: 'Natasha',
        family_name: 'Romanoff',
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
    birthday: null,
    gender: null,
    idNumber: null,
    picture: null,
  })

  expect(callback).toHaveBeenCalledWith(null, event)
})
