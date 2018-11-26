/* @flow */
import * as yup from 'yup'
import { createModel } from 'utils/orm'

const UserBase = createModel({
  tableName: process.env.USERS_TABLE || 'Users',
  schema: yup.object().shape({
    userId: yup.string().required(),
    email: yup
      .string()
      .email()
      .required(),
    phone: yup.string().matches(/^\+([0-9]+)$/),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    birthday: yup.date().nullable(),
    gender: yup
      .string()
      .oneOf(['MALE', 'FEMALE', null])
      .nullable(),
    idNumber: yup.number().nullable(),
    picture: yup.string().nullable(),
  }),
})

export default class User extends UserBase {
  get profileCompleteness() {
    const accountableFields = [
      'email',
      'phone',
      'firstName',
      'lastName',
      'birthday',
      'gender',
      'idNumber',
      'picture',
    ]

    const scorePerField = 100 / accountableFields.length
    return Math.floor(
      accountableFields.reduce((acc, field) => acc + (this[field] ? scorePerField : 0), 0),
    )
  }
}
