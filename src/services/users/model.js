/* @flow */
import * as yup from 'yup'
import { createModel } from 'utils/orm'

export default createModel({
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
