/* @flow */
import User from '../model'

type Event = {
  request: {
    userAttributes: {
      sub: string,
      email: string,
      phone_number: string,
      name: string,
      family_name: string,
    },
  },
}

export default async function createUser(event: Event, context: null, callback: Function) {
  const { userAttributes } = event.request

  const user = new User({
    userId: userAttributes.sub,
    email: userAttributes.email,
    phone: userAttributes.phone_number,
    firstName: userAttributes.name,
    lastName: userAttributes.family_name,
  })

  await user.save()
  callback(null, event)
  return { user }
}
