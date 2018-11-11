/* @flow */
import { doc } from '@gopato/serverless-dynamodb-client'
import uuid from 'uuid'

type Input = {
  data: {
    message: string,
  },
}

export default async function createData({ input }: { input: Input }) {
  const data = {
    dataId: uuid.v1(),
    ...input.data,
  }

  await doc
    .put({
      TableName: process.env.DATA_TABLE,
      Item: data,
    })
    .promise()

  return { data }
}
