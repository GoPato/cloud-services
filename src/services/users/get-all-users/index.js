/* @flow */
import User from '../model'

export default async function getAllUsers() {
  const users = await User.getAll()
  return { users: users.toArray() }
}
