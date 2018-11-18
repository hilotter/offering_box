var express = require('express');
var googlehome = require('google-home-notifier');
var bodyParser = require('body-parser');
var app = express();
const serverPort = 8091; // default port

var deviceName = 'Google Home';
var ip = process.env.GOOGLE_HOME_IP; // default IP

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/google-home-notifier', urlencodedParser, function (req, res) {
  
  if (!req.body) return res.sendStatus(400)
  console.log(req.body);
  
  var text = req.body.text;
  
  if (req.query.ip) {
     ip = req.query.ip;
  }

  var language = 'ja'; // default language code
  if (req.query.language) {
    language;
  }

  googlehome.ip(ip, language);
  googlehome.device(deviceName,language);

  if (text){
    try {
      if (text.startsWith('http')){
        var mp3_url = text;
        googlehome.play(mp3_url, function(notifyRes) {
          console.log(notifyRes);
          res.send(deviceName + ' will play sound from url: ' + mp3_url + '\n');
        });
      } else {
        googlehome.notify(text, function(notifyRes) {
          console.log(notifyRes);
          res.send(deviceName + ' will say: ' + text + '\n');
        });
      }
    } catch(err) {
      console.log(err);
      res.sendStatus(500);
      res.send(err);
    }
  }else{
    res.send('Please GET "text=Hello Google Home"');
  }
})

app.get('/google-home-notifier', function (req, res) {

  console.log(req.query);

  var text = req.query.text;

  if (req.query.ip) {
     ip = req.query.ip;
  }

  var language = 'pl'; // default language code
  if (req.query.language) {
    language;
  }

  googlehome.ip(ip, language);
  googlehome.device(deviceName,language);

  if (text) {
    try {
      if (text.startsWith('http')){
        var mp3_url = text;
        googlehome.play(mp3_url, function(notifyRes) {
          console.log(notifyRes);
          res.send(deviceName + ' will play sound from url: ' + mp3_url + '\n');
        });
      } else {
        googlehome.notify(text, function(notifyRes) {
          console.log(notifyRes);
          res.send(deviceName + ' will say: ' + text + '\n');
        });
      }
    } catch(err) {
      console.log(err);
      res.sendStatus(500);
      res.send(err);
    }
  }else{
    res.send('Please GET "text=Hello+Google+Home"');
  }
})

app.listen(serverPort, function () {
  const url = 'http://localhost' + ':' + serverPort + '/google-home-notifier';
  console.log('Endpoints:');
  console.log('    ' + url);
  console.log('GET example:');
  console.log('curl -X GET ' + url + '?text=Hello+Google+Home');
	console.log('POST example:');
	console.log('curl -X POST -d "text=Hello Google Home" ' + url);
})
