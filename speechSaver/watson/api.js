const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const constants = require('../tools/constants')

const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
        apikey: constants.watsonApiKey,
    }),
    url: constants.watsonInstanceUrl,
});

const basicParams = {
    accept: 'audio/wav',
};

const supportedVoice = {
    usa: 'en-US_AllisonV3Voice',
    korea: 'ko-KR_YoungmiVoice'
}


exports.convertToVoice = async (text, region) => {

    if (supportedVoice[region] == undefined) {
        throw new Error("Unsupported region yet")
    }

    try {

        const options = {
            ...basicParams,
            voice: supportedVoice[region],
            text: text
        }
          
        const response = await textToSpeech.synthesize(options)

        const voiceBuffer = await textToSpeech.repairWavHeaderStream(
            response.result
        )

        return voiceBuffer

    } catch (err) {
        throw err
    }

}
