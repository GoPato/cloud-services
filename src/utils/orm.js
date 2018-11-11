/* @flow */
/* eslint-disable no-console */
import { setupTable, teardownTable } from '@gopato/serverless-dynamodb-local-utils'
import { doc } from '@gopato/serverless-dynamodb-client'

export function createModel(tableName: string) {
  return class Model {
    // Test utils
    static async setupTable() {
      await setupTable(tableName, true)
    }

    static async teardownTable() {
      await teardownTable(tableName)
    }

    constructor(data: any) {
      Object.assign(this, data)
    }

    static async exec(method: string, params: Object): any {
      try {
        return await doc[method]({
          TableName: tableName,
          ...params,
        }).promise()
      } catch (error) {
        console.error(error)
        return null
      }
    }

    static async getAll(): Promise<Model[]> {
      const { Items } = await this.exec('scan', {})
      return Items.map(item => new this(item))
    }

    static async get(params: Object): Promise<Model> {
      const { Item } = await this.exec('get', {
        Key: params,
      })

      if (!Item) {
        throw new Error(`Nothing found with ${JSON.stringify(params)}`)
      }

      return new this(Item)
    }

    async save() {
      await Model.exec('put', { Item: this })
    }

    async update(data: Object) {
      Object.assign(this, data)
      await this.save()
    }
  }
}
