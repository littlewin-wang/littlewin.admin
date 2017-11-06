const COS = require('cos-js-sdk-v5')

module.exports = (config) => {
  let getAuthorization = (options, callback) => {
    var authorization = COS.getAuthorization({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
      Method: options.Method,
      Key: options.Key
    })
    callback(authorization)
  }

  return new COS({
    // 必选参数
    AppId: config.AppId,
    getAuthorization
  })
}
