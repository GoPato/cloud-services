// /* @flow */
import { setupTable, teardownTable } from '@gopato/serverless-dynamodb-local-utils'
import { doc } from '@gopato/serverless-dynamodb-client'

import createData from '../handlers/create-data'
import dataFixture from './__fixtures__/data-input.json'

beforeEach(() => setupTable(process.env.DATA_TABLE, true))
afterEach(() => teardownTable(process.env.DATA_TABLE))

it('should insert data', async () => {
  const { data } = await createData(dataFixture)
  expect(data).toMatchObject(dataFixture.input.data)

  const { Item } = await doc
    .get({
      TableName: process.env.DATA_TABLE,
      Key: {
        dataId: data.dataId,
      },
    })
    .promise()

  expect(Item).toEqual(data)
})
