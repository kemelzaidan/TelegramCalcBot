'use strict';
var math = require('mathjs');

module.exports.calculate = (event, context, callback) => {
  let body = JSON.parse(event.body);
  let answer = math.eval(body.expression);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      answer: `${answer}`,
      //input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
