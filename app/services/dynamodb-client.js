import 'app/node_modules/aws-sdk/dist/aws-sdk'

const AWS = window.AWS

export default class DynamoDBClient
{
  constructor (config) {
    this.db = new AWS.DynamoDB({
      accessKeyId: config.key,
      secretAccessKey: config.secret,
      region: config.region,
      endpoint: config.endpoint
    })
  }

  listTable (callback) {
    this.db.listTables((err, data) => {
      if (err) {
        console.log(err.stack)
        callback(null)
      } else {
        callback(data.TableNames)
      }
    })
  }

  scan (params, callback) {
    this.db.scan(params, (err, data) => {
      if (err) {
        console.log(err.stack)
        callback(null)
      } else {
        callback(data)
      }
    })
  }

  query (params, callback) {
    this.db.query(params, (err, data) => {
      if (err) {
        console.log(err.stack)
        callback(null)
      } else {
        callback(data)
      }
    })
  }

  putItem (params, callback) {
    this.db.putItem(params, (err, data) => {
      if (err) {
        console.log(err.stack)
        callback(null)
      } else {
        callback(data)
      }
    })
  }
}
