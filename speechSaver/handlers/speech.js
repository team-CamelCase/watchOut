const storage = require('../storage/api')
const dbClient = require('../models/client')
const watsonClient = require('../watson/api')

exports.saveSpeechFile = async (req, res) => {

	try {
		if (!isRequestValid(req)) {
			res.statusCode = 500;
			res.end("")
		}

		const region = "korea"

		var db = dbClient.getCollection(region + '-news')

		const newNewsData = {
			title: req.body.title,
			content: req.body.content,
			region: region,
			type: "info", // warning, etc
			createdTime: Date.now()
		}

		const insertedResult = await db.insertOne(newNewsData)
		const assignedId = insertedResult.ops[0]._id

		const voiceData = await watsonClient.convertToVoice(
			req.body.content,
			region
		)

		const fileName = makeFileName(
			assignedId,
			newNewsData
		)

		await storage.upload(fileName, voiceData)

		await db.updateOne(
			{ _id: assignedId },
			{ $set: { fileName: fileName } }
		)

		res.statusCode = 200;
		res.end(fileName)

	} catch (err) {

		res.statusCode = 500;
		console.log(err)
		res.end(err.Message)
	}
}

const makeFileName = (id, newsData) => {
	return `${id}-${newsData.region}-${newsData.type}.wav`
}

const isRequestValid = (req) => {
	if (req.body.title == undefined
		|| req.body.title == null) {
		return false
	}

	if (req.body.content == undefined
		|| req.body.content == null) {
		return false
	}

	return true
}