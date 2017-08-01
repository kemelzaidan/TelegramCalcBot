'use strict';
//npm libs
var math = require('mathjs');
var request = require('request');

// telegram api endpoint
const uri = 'https://api.telegram.org/bot439324808:AAEUxvBeHEnnq3UVUPS5CAwQ1is5xXq-kPQ/'

// default handler for POST on '/'
module.exports.calculate = (event, context, callback) => {
  callback(null, {statusCode: 200});

  console.log('Received an update: ', event.body);
  
  let update = JSON.parse(event.body);
  let message = update.message
  // let inline_query = update.inline_query

  if (message.text[0] !== '/') {
    let answer = math.eval(message.text)
    console.log('ANSWER: ', answer);
    
    const answerMessage = {
      url: uri + 'sendMessage',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: message.chat.id,
        text: answer,
        reply_to_message_id: message.id
      })
    }

    console.log('Answer Message: ', answerMessage);
    request.post(answerMessage, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var success = JSON.parse(body);
        console.log('Request successfull: ', success);
      }
      else {
        console.error('Something went wrong: ', response);
      }
    });
  }
};
