require('dotenv').config()

exports.port = process.env.SPEECH_SAVER_PORT
exports.basePath = "/api/v1"

// DB connection
exports.dbId = process.env.DB_ID
exports.dbPwd = process.env.DB_PWD
exports.dbHost = process.env.DB_HOST
exports.dbDefaultName = process.env.DB_DEFAULT_NAME

// Object Storage Connection
exports.endpoint =process.env.COS_ENDPOINT
exports.apiKeyId= process.env.COS_API_KEY_ID
exports.ibmAuthEndpoint = process.env.COS_AUTH_ENDPOINT
exports.serviceInstanceId= process.env.COS_SERVICE_CRN
exports.defaultBucketName = process.env.BUCKET_ONE

exports.splitSizeUnit = 1024 * 1024 * 5

// Watson
exports.watsonApiKey = process.env.WATSON_API_KEY
exports.watsonInstanceUrl = process.env.WATSON_URL