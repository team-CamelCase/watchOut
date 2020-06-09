

// Required libraries
const ibm = require('ibm-cos-sdk');
const constants = require('../tools/constants')

const config = {
	endpoint: constants.endpoint,
	apiKeyId: constants.apiKeyId,
	ibmAuthEndpoint: constants.ibmAuthEndpoint,
	serviceInstanceId: constants.serviceInstanceId,
};

var cos = new ibm.S3(config);

// filename will be "key"
// 사용 예시 : await upload(newBucketName, newLargeFileName, buffer)
//
exports.upload = async (fileName, fileBuffer, bucketName = constants.defaultBucketName) => {

	if (fileBuffer == null) {
		throw new Error("file Buffer is empty!")
	}

	try {

		const uploadInfo = {
			Bucket: bucketName,
			Key: fileName
		}

		const uploadRequestInfo = await cos.createMultipartUpload(
			uploadInfo
		).promise()

		uploadInfo.UploadId = uploadRequestInfo.UploadId

		// 파일을 부분으로 나누어 비동기로 업로드
		await startMultiPartUpload(
			uploadInfo,
			fileBuffer,
		)

	} catch (error) {
		console.log("storage throw error", error.message)
		throw error
	}

}

// Retrieve the list of contents for a bucket
exports.getBucketContents = async (bucketName) => {

	try {

		console.log(
			`Retrieving bucket contents from: ${bucketName}`
		);

		const bucketInfo = { Bucket: bucketName }

		const data = await cos.listObjects(bucketInfo)
			.promise()

		return data.Contents

	} catch (err) {
		throw err
	}
}

// Retrieve a particular item from the bucket
exports.getItem = async (bucketName, itemName) => {

	try {

		const objectInfo = {
			Bucket: bucketName,
			Key: itemName
		}

		const data = await cos.getObject(objectInfo)
			.promise()

		if (data) {
			return Buffer.from(data.Body)
		}

	} catch (err) {
		throw err
	}
}


// Delete item
exports.deleteItem = async (bucketName, itemName) => {

	try {

		console.log(`Deleting item: ${itemName}`);

		const objectInfo = {
			Bucket: bucketName,
			Key: itemName
		}

		await cos.deleteObject(objectInfo)
			.promise()

		console.log(itemName, "삭제 성공")

	} catch (err) {
		throw err
	}
}

/**** Private Function ****/

const splitFileSize = async (fileLength, splitUnit) => {

	var fractionCnt = Math.ceil(fileLength / splitUnit);

	var fractions = []

	for (var i = 0; i < fractionCnt; i++) {

		fractions.push({
			start: i * splitUnit,
			end: Math.min(
				i * splitUnit + splitUnit,
				fileLength
			)
		})
	}

	return fractions
}

// 파일을 부분으로 나누어 비동기로 업로드
const startMultiPartUpload = async (uploadInfo, fileBuffer) => {

	try {

		const fractions = await splitFileSize(
			fileBuffer.length,
			constants.splitSizeUnit
		)

		const uploadedDataResults = await Promise.all(

			fractions.map((eachFileSize, idx) => {

				return cos.uploadPart({
					Body: fileBuffer.slice(
						eachFileSize.start,
						eachFileSize.end
					),
					PartNumber: idx + 1,
					...uploadInfo,
				}).promise()
			})
		)

		// Commit Data
		await cos.completeMultipartUpload({
			...uploadInfo,
			MultipartUpload: {
				Parts: uploadedDataResults.map(
					(result, idx) => {
						result.PartNumber = idx + 1
						return result
					})
			},
		}).promise()

		console.log("업로드 성공!")

	} catch (err) {

		cancelMultiPartUpload(uploadInfo)

		throw err
	}
}

const cancelMultiPartUpload = async (uploadInfo) => {
	try {

		await cos.abortMultipartUpload(uploadInfo).promise()

		console.log(
			`Multi-part upload aborted for ${uploadInfo.Key}`
		);

	} catch (e) {
		console.log(
			"canceling multipart itself, error ",
			e
		)
	}
}
