const dbClient = require('../models/client');
const constants = require('../tools/constants');
const region = constants.currentRegion;
var ObjectId = require('mongodb').ObjectId;

exports.getAllNewsFile = async (req, res) => {

  try {
    var news = dbClient.getCollection(region + '-news');
    var ids = req.body.ids;
    var query = {};

    if (ids) {
      ids = ids.split(',');
      ids = ids.map(id => ObjectId(id));
      query = { "_id": {$in: ids} };
    }

    // 전체 음성 파일 메타 데이터
    await news.find(query).toArray((err, docs) => {
      if (err) throw err;
      console.log(docs);
      res.statusCode = 200;
      res.json(docs);
    });
  } catch (err) {
    res.statusCode = 500;
    console.log(err);
    res.end(err.Message)
  }
};

exports.getLatestNewsFile = async (req, res) => {
  const defaultNewNum = 5;

  try {
    const newsNum = (req.params.number * 1) || defaultNewNum;
    var news = dbClient.getCollection(region + '-news');

    // 최신 음성파일 메타 데이터
    await news.find()
        .sort({createdTime: -1})
        .limit(newsNum).toArray(function (err, docs){
      if (err) throw err;
      console.log(docs);
      res.statusCode = 200;
      res.json(docs);
    });
  } catch (err) {
    res.statusCode = 500;
    console.log(err);
    res.end(err.Message);
  }
};