
const MongoClient = require('mongodb').MongoClient;
const constants = require('../tools/constants')

const uri = `mongodb+srv://${constants.dbId}:${constants.dbPwd}@${constants.dbHost}/${constants.dbDefaultName}?retryWrites=true&w=majority`

const client = new MongoClient(
    uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        numberOfRetries: 5,
        poolSize: 40,
    }
);

// DB should be used after it is initialized
var DB

// Connect mongo client
exports.init = async () => {
    try {
        await client.connect()

        DB = client.db("ibm_fight_covid")

        console.log("DB connection success")

    }catch(err){
        console.log("DB connection failed")
        throw err
    }
}

exports.getCollection = (collectionName) => {

    if (DB == null || DB == undefined) {
        throw new Error("DB is not initialized")
    }

    return DB.collection(collectionName)
}
