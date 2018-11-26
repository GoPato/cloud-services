/* @flow */
/* eslint-disable no-console */
import { setupTable, teardownTable } from '@gopato/serverless-dynamodb-local-utils'
import { doc } from '@gopato/serverless-dynamodb-client'

export function createModel({ tableName, schema }: { tableName: string, schema: Object }) {
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
      const { Items: data } = await this.exec('scan', {})
      const items = data.map(item => new this(item))

      function toArray() {
        return items.map(item => item.toJSON())
      }

      return {
        items,
        toArray,
      }
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
      await schema.validate(this, { strict: true })
      await Model.exec('put', { Item: this })
    }

    async update(data: Object) {
      Object.assign(this, data)
      await this.save()
    }

    toJSON() {
      const jsonObj = Object.assign({}, this)
      const proto = Object.getPrototypeOf(this)

      /* eslint-disable */
      for (const key of Object.getOwnPropertyNames(proto)) {
        const desc = Object.getOwnPropertyDescriptor(proto, key)
        const hasGetter = desc && typeof desc.get === 'function'
        if (hasGetter) {
          jsonObj[key] = this[key]
        }
      }
      /* eslint-enable */

      return jsonObj
    }
  }
}
