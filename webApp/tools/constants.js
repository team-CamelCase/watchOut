require('dotenv').config()

exports.port = process.env.WEB_APP_PORT
exports.basePath = "/api/v1"
exports.currentRegion = "korea"

// DB connection
exports.dbId = process.env.DB_ID
exports.dbPwd = process.env.DB_PWD
exports.dbHost = process.env.DB_HOST
exports.dbDefaultName = process.env.DB_DEFAULT_NAME

exports.splitSizeUnit = 1024 * 1024 * 5

// react
exports.REACT_APP_IPINFO_TOKEN = "3862e907bd7876"