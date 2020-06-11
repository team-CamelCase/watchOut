const dbClient = require('../models/client')

exports.getTextFile = async (req, res) => {

  try {
    const region = "korea"

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