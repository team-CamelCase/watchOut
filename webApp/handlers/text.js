const dbClient = require('../models/client')
const constants = require('../tools/constants')

exports.getALLTextFile = async (req, res) => {

  try {
    const region = constants.currentRegion

    var news = dbClient.getCollection(region + '-news')

    // 전체 목록
    await news.find().toArray(function (err, docs) {
      console.log(docs);
      res.statusCode = 200;
      res.end(JSON.stringify(docs));
    });

  } catch (err) {
    res.statusCode = 500;
    console.log(err)
    res.end(err.Message)
  }
}

exports.getLatestTextFile = async (req, res) => {

  try {
    const region = constants.currentRegion
    const textNum = req.params.number * 1 || 5

    var news = dbClient.getCollection(region + '-news')

    // 전체 목록
    await news.find().sort({createdTime: -1}).limit(textNum).toArray(function (err, docs){
      console.log(docs);
      res.statusCode = 200;
      res.end(JSON.stringify(docs));
    });
  } catch (err) {
    res.statusCode = 500;
    console.log(err)
    res.end(err.Message)
  }
}