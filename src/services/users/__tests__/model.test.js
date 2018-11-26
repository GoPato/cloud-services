/* @flow */
import User from '../model'

it('should compute profileCompleteness', () => {
  const user = new User({
    email: 'user@gopato.com',
    phone: '+50680000000',
    firstName: 'One',
    lastName: 'First',
    birthday: Date.now(),
    gender: 'MALE',
    idNumber: '000000000',
    picture: 'https://placehold.it/200',
  })

  expect(user.profileCompleteness).toEqual(100)
})
