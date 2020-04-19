const express = require('express');
var DOMParser = require('xmldom').DOMParser;
var cors = require('cors');

const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');

const app = express();
const port = 3000;
app.use(cors());

//var https = require('https');
var http = require('http');

// Creates a client
const client = new textToSpeech.TextToSpeechClient();
async function quickStart(text) {
  // The text to synthesize
  //const text = 'hello, world!';

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: 'hi-IN', ssmlGender: 'NEUTRAL'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
  console.log(response)
  return response
}
quickStart("अ");

//app.get('/', (req, res) => res.send('Hello World!'))
console.log("listening");

app.get('/',function(request,response)
{
  console.log(request.query);
    var city = request.query.city;
    if (request.query.letter) {
      console.log(request.query.letter);
      var data = quickStart(request.query.letter);
      data.then(ret => {
        console.log("responding")
        console.log(ret)
        response.send(ret);
      });
    }
    if (request.query.street && request.query.city && request.query.state) {
      var cityUrlPart1 = 'https://maps.googleapis.com/maps/api/geocode/json?address=' ;
      var cityUrlPart2 = '&types=(cities)&language=en&key=AIzaSyD5QabQiBDXMAf4aGeTHk0gxCTRm0Hd-JQ';  
      var url = cityUrlPart1 + request.query.street + ',' + request.query.city + ',' + request.query.state + '&key=AIzaSyD5QabQiBDXMAf4aGeTHk0gxCTRm0Hd-JQ';
      url = url.replace(/ /g,"+");
      console.log(url);
      console.log("getting geolocation");
      https.get(url, (resp) => {
              let data = '';
            
              // A chunk of data has been recieved.
              resp.on('data', (chunk) => {
                data += chunk;
              });
            
              // The whole response has been received. Print out the result.
              resp.on('end', () => {
                /*var parser = new DOMParser();
                var xmlDoc = new DOMParser().parseFromString(data);

                var lat = xmlDoc.getElementsByTagName("lat")[0].childNodes[0].nodeValue;
                var long = xmlDoc.getElementsByTagName("lng")[0].childNodes[0].nodeValue;*/
                //var weatherData = getWeatherData(lat, long, response);
                //console.log("got geolocation");
                console.log(data);
                response.send(data);
              });
            
            }).on("error", (err) => {
              console.log("Error: " + err.message);
            });
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));