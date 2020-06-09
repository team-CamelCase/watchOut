const storage = require('../storage/api')
const dbClient = require('../models/client')
const watsonClient = require('../watson/api')

exports.saveSpeechFile = async (req, res) => {

	try {
		const region = "korea"

		var db = dbClient.getCollection(region + '-news')

		const newNewsData = {
			text: req.body.text,
			region: region,
			type: "info", // warning, etc
			createdTime: Date.now()
		}

		await db.insertOne(newNewsData)

		const voiceData = await watsonClient.convertToVoice(
			req.body.text, 
			region
		)

		const fileName = makeFileName(newNewsData)

		await storage.upload(fileName, voiceData)

		const newVoiceFileMetaData = {
			key: key,
			region: region,
			type: "info",
			createdTime: Date.now()
		}

		db = dbClient.getCollection(region + "-voice")

		await db.insertOne(newVoiceFileMetaData)

		res.statusCode = 200;
		res.end("음성파일 생성 성공")

	} catch (err) {

		res.statusCode = 500;
		console.log(err)
		res.end(err.Message)
	}
}

const makeFileName = (newsData) => {
	return `${newsData.region}-${newsData.type}-${newsData.createdTime}.wav`
}