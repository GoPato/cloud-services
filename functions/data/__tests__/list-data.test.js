/* @flow */
import { setupTable, teardownTable } from '@gopato/serverless-dynamodb-local-utils'

import seed from 'models/data/seed.json'
import listData from '../handlers/list-data'

beforeEach(() => setupTable(process.env.DATA_TABLE, true))
afterEach(() => teardownTable(process.env.DATA_TABLE))

it('should return data', async () => {
  const { data } = await listData()
  expect(data).toEqual(seed)
})
