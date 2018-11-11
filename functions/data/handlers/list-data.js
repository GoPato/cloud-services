/* @flow */
import { doc } from '@gopato/serverless-dynamodb-client'

export default async function listData() {
  const { Items: data } = await doc.scan({ TableName: process.env.DATA_TABLE }).promise()
  return { data }
}
