/* @flow */
import { createModel } from 'utils/orm'

export default createModel(process.env.USERS_TABLE || 'Users')
