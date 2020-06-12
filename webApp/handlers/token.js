const constants = require('../tools/constants');
const request = require('request');

exports.getAccessToken = async (req, res) => {
  const apiKey = constants.watsonApiKey;

  try {
    const options = option(apiKey);

    request.post(options, (err,httpResponse,body) => {
      if (err) throw err;

      res.statusCode = 200;
      res.json(JSON.parse(body));
    });



  } catch (err) {
    res.statusCode = 500;
    console.log(err);
    res.end(err.Message)
  }
};

var option = (apiKey) => {
  return {
    uri: 'https://iam.cloud.ibm.com/oidc/token',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      'apikey': apiKey,
      'response_type': 'cloud_iam',
      'grant_type': 'urn:ibm:params:oauth:grant-type:apikey'
    }
  };
};
