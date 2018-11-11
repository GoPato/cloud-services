/* @flow */
import User from '../model'

export default async function updateUser({ userId, user: data }: { userId: string, user: Object }) {
  const user = await User.get({ userId })
  await user.update(data)
  return { user }
}
