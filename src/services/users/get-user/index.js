/* @flow */
import User from '../model'

export default async function getUser({ userId }: { userId: string }) {
  const user = await User.get({ userId })
  return { user }
}
